//+------------------------------------------------------------------+
//|                                              NjabuloTrend.mq5    |
//|                        Copyright 2026, Njabulo Jb                 |
//|                                             https://github.com/NjabuloJf |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, Njabulo Jb"
#property link      "https://github.com/NjabuloJf"
#property version   "2.00"
#property strict

//--- Inputs
input double LotSize = 0.01;         // Lot size
input int    FastMA = 10;            // Fast Moving Average
input int    SlowMA = 50;            // Slow Moving Average
input int    StopLoss = 200;         // Stop Loss in points
input int    TakeProfit = 400;       // Take Profit in points
input int    MagicNumber = 12345;    // Magic Number to identify trades
input int    TrailingStop = 50;      // Trailing Stop in points
input int    MaxSpread = 30;         // Maximum spread allowed
input bool   UseMartingale = false;  // Use Martingale strategy
input double RiskPercent = 2.0;      // Risk per trade %

//--- Global Variables
double currentMAFast, currentMASlow, previousMAFast, previousMASlow;
int lastBarTime = 0;
double maxProfit = 0;
double minProfit = 0;
int consecutiveLosses = 0;
double totalProfit = 0;
int totalTrades = 0;
int winCount = 0;
int lossCount = 0;

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
  {
   Print("╔═══════════════════════════════════════════════════════════════════╗");
   Print("║           ★ NJABULO TREND ROBOT v2.0 ★                          ║");
   Print("║           Fast MA: ", FastMA, " | Slow MA: ", SlowMA, "                     ║");
   Print("║           Lot Size: ", LotSize, " | Magic: ", MagicNumber, "              ║");
   Print("║           Trailing Stop: ", TrailingStop, " | Max Spread: ", MaxSpread, "       ║");
   Print("║           Risk: ", RiskPercent, "% | Martingale: ", UseMartingale, "         ║");
   Print("╚═══════════════════════════════════════════════════════════════════╝");
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
  {
   // Get MA values
   GetMAValues();
   
   // Check for new bar
   if(CheckNewBar())
     {
      // Check for trading signals
      CheckSignals();
     }
   
   // Manage open positions
   ManagePositions();
   
   // Update robot status
   UpdateStatus();
  }

//+------------------------------------------------------------------+
//| Get Moving Average Values                                        |
//+------------------------------------------------------------------+
void GetMAValues()
  {
   currentMAFast = iMA(_Symbol, PERIOD_CURRENT, FastMA, 0, MODE_SMA, PRICE_CLOSE, 0);
   currentMASlow = iMA(_Symbol, PERIOD_CURRENT, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 0);
   previousMAFast = iMA(_Symbol, PERIOD_CURRENT, FastMA, 0, MODE_SMA, PRICE_CLOSE, 1);
   previousMASlow = iMA(_Symbol, PERIOD_CURRENT, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 1);
  }

//+------------------------------------------------------------------+
//| Check for new bar                                                |
//+------------------------------------------------------------------+
bool CheckNewBar()
  {
   int currentBarTime = (int)SeriesInfoInteger(_Symbol, PERIOD_CURRENT, SERIES_TIME);
   if(currentBarTime != lastBarTime)
     {
      lastBarTime = currentBarTime;
      return true;
     }
   return false;
  }

//+------------------------------------------------------------------+
//| Check trading signals                                            |
//+------------------------------------------------------------------+
void CheckSignals()
  {
   // Check spread
   double spread = (SymbolInfoDouble(_Symbol, SYMBOL_ASK) - SymbolInfoDouble(_Symbol, SYMBOL_BID)) / _Point;
   if(spread > MaxSpread) return;
   
   int openTrades = CountTrades();
   if(openTrades >= 3) return; // Max 3 trades at once
   
   // BUY Signal: Fast MA crosses above Slow MA
   if(previousMAFast < previousMASlow && currentMAFast > currentMASlow)
     {
      ExecuteBuy();
     }
   
   // SELL Signal: Fast MA crosses below Slow MA
   if(previousMAFast > previousMASlow && currentMAFast < currentMASlow)
     {
      ExecuteSell();
     }
  }

//+------------------------------------------------------------------+
//| Calculate Lot Size with Risk Management                          |
//+------------------------------------------------------------------+
double CalculateLotSize()
  {
   if(UseMartingale && consecutiveLosses > 0)
     {
      return LotSize * MathPow(2, consecutiveLosses);
     }
   
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskAmount = balance * (RiskPercent / 100);
   double stopDistance = StopLoss * _Point;
   double lot = riskAmount / stopDistance;
   lot = MathMin(lot, LotSize * 10);
   lot = MathMax(lot, LotSize);
   return NormalizeDouble(lot, 2);
  }

//+------------------------------------------------------------------+
//| Execute Buy order                                                |
//+------------------------------------------------------------------+
void ExecuteBuy()
  {
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double lot = CalculateLotSize();
   double sl = ask - StopLoss * _Point;
   double tp = ask + TakeProfit * _Point;
   
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action   = TRADE_ACTION_DEAL;
   request.symbol   = _Symbol;
   request.volume   = lot;
   request.type     = ORDER_TYPE_BUY;
   request.price    = ask;
   request.sl       = sl;
   request.tp       = tp;
   request.magic    = MagicNumber;
   request.comment  = "Njabulo Trend Buy";
   request.deviation = 10;
   request.type_filling = ORDER_FILLING_FOK;
   
   if(OrderSend(request, result))
     {
      Print("✅ BUY Order Executed: ", result.comment);
      Print("   Price: ", ask, " | SL: ", sl, " | TP: ", tp);
      totalTrades++;
      maxProfit = 0;
     }
   else
     {
      Print("❌ BUY Order Failed: ", result.retcode);
     }
  }

//+------------------------------------------------------------------+
//| Execute Sell order                                               |
//+------------------------------------------------------------------+
void ExecuteSell()
  {
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double lot = CalculateLotSize();
   double sl = bid + StopLoss * _Point;
   double tp = bid - TakeProfit * _Point;
   
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action   = TRADE_ACTION_DEAL;
   request.symbol   = _Symbol;
   request.volume   = lot;
   request.type     = ORDER_TYPE_SELL;
   request.price    = bid;
   request.sl       = sl;
   request.tp       = tp;
   request.magic    = MagicNumber;
   request.comment  = "Njabulo Trend Sell";
   request.deviation = 10;
   request.type_filling = ORDER_FILLING_FOK;
   
   if(OrderSend(request, result))
     {
      Print("✅ SELL Order Executed: ", result.comment);
      Print("   Price: ", bid, " | SL: ", sl, " | TP: ", tp);
      totalTrades++;
      maxProfit = 0;
     }
   else
     {
      Print("❌ SELL Order Failed: ", result.retcode);
     }
  }

//+------------------------------------------------------------------+
//| Manage Open Positions                                            |
//+------------------------------------------------------------------+
void ManagePositions()
  {
   for(int i = PositionsTotal() - 1; i >= 0; i--)
     {
      if(PositionSelectByTicket(PositionGetTicket(i)))
        {
         if(PositionGetInteger(POSITION_MAGIC) != MagicNumber) continue;
         
         double profit = PositionGetDouble(POSITION_PROFIT);
         double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
         double currentPrice = PositionGetDouble(POSITION_PRICE_CURRENT);
         ENUM_POSITION_TYPE type = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
         
         // Track profit for statistics
         totalProfit += profit;
         if(profit > 0) winCount++;
         else lossCount++;
         
         // Track max profit for trailing stop
         if(profit > maxProfit) maxProfit = profit;
         
         // Trailing Stop Logic
         if(TrailingStop > 0 && maxProfit > 0)
           {
            double trailLevel = maxProfit - TrailingStop * _Point * LotSize * 10;
            if(trailLevel > 0)
              {
               double newSL = type == POSITION_TYPE_BUY ? 
                              currentPrice - TrailingStop * _Point :
                              currentPrice + TrailingStop * _Point;
               ModifyStopLoss(newSL);
              }
           }
        }
     }
  }

//+------------------------------------------------------------------+
//| Modify Stop Loss                                                 |
//+------------------------------------------------------------------+
void ModifyStopLoss(double newSL)
  {
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   ulong ticket = PositionGetTicket(0);
   
   request.action = TRADE_ACTION_SLTP;
   request.symbol = _Symbol;
   request.sl = newSL;
   request.tp = PositionGetDouble(POSITION_TP);
   request.position = ticket;
   request.magic = MagicNumber;
   
   if(OrderSend(request, result))
     {
      Print("🔄 Trailing Stop Updated: ", result.comment);
     }
  }

//+------------------------------------------------------------------+
//| Count open trades                                                |
//+------------------------------------------------------------------+
int CountTrades()
  {
   int count = 0;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
     {
      if(PositionSelectByTicket(PositionGetTicket(i)))
        {
         if(PositionGetInteger(POSITION_MAGIC) == MagicNumber)
           {
            count++;
           }
        }
     }
   return count;
  }

//+------------------------------------------------------------------+
//| Update Status                                                    |
//+------------------------------------------------------------------+
void UpdateStatus()
  {
   if(TimeCurrent() % 60 == 0) // Every minute
     {
      Print("📊 Status Update:");
      Print("   Trades: ", totalTrades, " | Win: ", winCount, " | Loss: ", lossCount);
      Print("   Profit: $", totalProfit, " | Win Rate: ", GetWinRate(), "%");
      Print("   Active Trades: ", CountTrades());
     }
  }

//+------------------------------------------------------------------+
//| Get Win Rate                                                     |
//+------------------------------------------------------------------+
double GetWinRate()
  {
   if(totalTrades == 0) return 0;
   return NormalizeDouble((double)winCount / totalTrades * 100, 2);
  }

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   Print("╔═══════════════════════════════════════════════════════════════════╗");
   Print("║           ★ NJABULO TREND ROBOT STOPPED ★                       ║");
   Print("║           Total Trades: ", totalTrades, " | Win Rate: ", GetWinRate(), "%           ║");
   Print("║           Total Profit: $", totalProfit, "                               ║");
   Print("║           Active Trades: ", CountTrades(), "                              ║");
   Print("╚═══════════════════════════════════════════════════════════════════╝");
  }
//+------------------------------------------------------------------+
