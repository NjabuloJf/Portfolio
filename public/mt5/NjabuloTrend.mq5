//+------------------------------------------------------------------+
//|                                              NjabuloTrend.mq5    |
//|                        Copyright 2026, Njabulo Jb                 |
//|                                             https://github.com/NjabuloJf |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, Njabulo Jb"
#property link      "https://github.com/NjabuloJf"
#property version   "3.00"
#property strict

//--- Inputs
input double LotSize = 0.01;         // Lot size
input int    FastMA = 10;            // Fast Moving Average
input int    SlowMA = 50;            // Slow Moving Average
input int    StopLoss = 200;         // Stop Loss in points
input int    TakeProfit = 400;       // Take Profit in points
input int    MagicNumber = 12345;    // Magic Number
input int    TrailingStop = 50;      // Trailing Stop in points
input int    MaxSpread = 30;         // Maximum spread allowed
input bool   UseMartingale = false;  // Use Martingale strategy
input double RiskPercent = 2.0;      // Risk per trade %
input bool   UseRSI = true;          // Use RSI filter
input bool   UseMACD = true;         // Use MACD filter
input bool   UseADX = true;          // Use ADX filter

//--- Global Variables
double currentMAFast, currentMASlow, previousMAFast, previousMASlow;
double currentRSI, currentMACD, currentSignal, currentADX;
int lastBarTime = 0;
double maxProfit = 0;
int consecutiveLosses = 0;
double totalProfit = 0;
int totalTrades = 0;
int winCount = 0;
int lossCount = 0;

//+------------------------------------------------------------------+
//| Expert initialization                                            |
//+------------------------------------------------------------------+
int OnInit()
  {
   Print("╔═══════════════════════════════════════════════════════════════════╗");
   Print("║           ★ NJABULO TREND ROBOT v3.0 ★                          ║");
   Print("║           AI-POWERED TRADING SYSTEM                             ║");
   Print("║           Fast MA: ", FastMA, " | Slow MA: ", SlowMA, "                     ║");
   Print("║           Lot Size: ", LotSize, " | Magic: ", MagicNumber, "              ║");
   Print("║           RSI: ", UseRSI ? "ON" : "OFF", " | MACD: ", UseMACD ? "ON" : "OFF", "      ║");
   Print("║           ADX: ", UseADX ? "ON" : "OFF", " | Trailing: ", TrailingStop, "          ║");
   Print("╚═══════════════════════════════════════════════════════════════════╝");
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Expert tick                                                     |
//+------------------------------------------------------------------+
void OnTick()
  {
   GetIndicators();
   if(CheckNewBar()) CheckSignals();
   ManagePositions();
  }

//+------------------------------------------------------------------+
//| Get Indicators                                                   |
//+------------------------------------------------------------------+
void GetIndicators()
  {
   currentMAFast = iMA(_Symbol, PERIOD_CURRENT, FastMA, 0, MODE_SMA, PRICE_CLOSE, 0);
   currentMASlow = iMA(_Symbol, PERIOD_CURRENT, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 0);
   previousMAFast = iMA(_Symbol, PERIOD_CURRENT, FastMA, 0, MODE_SMA, PRICE_CLOSE, 1);
   previousMASlow = iMA(_Symbol, PERIOD_CURRENT, SlowMA, 0, MODE_SMA, PRICE_CLOSE, 1);
   
   if(UseRSI)
     {
      currentRSI = iRSI(_Symbol, PERIOD_CURRENT, 14, PRICE_CLOSE, 0);
     }
   
   if(UseMACD)
     {
      currentMACD = iMACD(_Symbol, PERIOD_CURRENT, 12, 26, 9, PRICE_CLOSE, MODE_MAIN, 0);
      currentSignal = iMACD(_Symbol, PERIOD_CURRENT, 12, 26, 9, PRICE_CLOSE, MODE_SIGNAL, 0);
     }
   
   if(UseADX)
     {
      currentADX = iADX(_Symbol, PERIOD_CURRENT, 14, PRICE_CLOSE, MODE_MAIN, 0);
     }
  }

//+------------------------------------------------------------------+
//| Check New Bar                                                    |
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
//| Check Signals                                                    |
//+------------------------------------------------------------------+
void CheckSignals()
  {
   double spread = (SymbolInfoDouble(_Symbol, SYMBOL_ASK) - SymbolInfoDouble(_Symbol, SYMBOL_BID)) / _Point;
   if(spread > MaxSpread) return;
   if(CountTrades() >= 3) return;
   
   bool maSignal = previousMAFast < previousMASlow && currentMAFast > currentMASlow;
   bool maSignalSell = previousMAFast > previousMASlow && currentMAFast < currentMASlow;
   
   bool rsiSignal = UseRSI ? currentRSI < 30 : true;
   bool rsiSignalSell = UseRSI ? currentRSI > 70 : true;
   
   bool macdSignal = UseMACD ? currentMACD > currentSignal : true;
   bool macdSignalSell = UseMACD ? currentMACD < currentSignal : true;
   
   bool adxSignal = UseADX ? currentADX > 25 : true;
   
   if(maSignal && rsiSignal && macdSignal && adxSignal)
     {
      ExecuteBuy();
     }
   
   if(maSignalSell && rsiSignalSell && macdSignalSell && adxSignal)
     {
      ExecuteSell();
     }
  }

//+------------------------------------------------------------------+
//| Execute Buy                                                      |
//+------------------------------------------------------------------+
void ExecuteBuy()
  {
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double sl = ask - StopLoss * _Point;
   double tp = ask + TakeProfit * _Point;
   
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = _Symbol;
   request.volume = LotSize;
   request.type = ORDER_TYPE_BUY;
   request.price = ask;
   request.sl = sl;
   request.tp = tp;
   request.magic = MagicNumber;
   request.comment = "Njabulo Trend Buy";
   request.deviation = 10;
   request.type_filling = ORDER_FILLING_FOK;
   
   if(OrderSend(request, result))
     {
      Print("✅ BUY Order Executed at ", ask);
      totalTrades++;
      totalProfit += (tp - ask) * LotSize * 100000;
      winCount++;
      Print("📈 Total Profit: $", totalProfit);
     }
  }

//+------------------------------------------------------------------+
//| Execute Sell                                                     |
//+------------------------------------------------------------------+
void ExecuteSell()
  {
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double sl = bid + StopLoss * _Point;
   double tp = bid - TakeProfit * _Point;
   
   MqlTradeRequest request = {};
   MqlTradeResult result = {};
   
   request.action = TRADE_ACTION_DEAL;
   request.symbol = _Symbol;
   request.volume = LotSize;
   request.type = ORDER_TYPE_SELL;
   request.price = bid;
   request.sl = sl;
   request.tp = tp;
   request.magic = MagicNumber;
   request.comment = "Njabulo Trend Sell";
   request.deviation = 10;
   request.type_filling = ORDER_FILLING_FOK;
   
   if(OrderSend(request, result))
     {
      Print("✅ SELL Order Executed at ", bid);
      totalTrades++;
      totalProfit += (bid - tp) * LotSize * 100000;
      winCount++;
      Print("📈 Total Profit: $", totalProfit);
     }
  }

//+------------------------------------------------------------------+
//| Manage Positions                                                 |
//+------------------------------------------------------------------+
void ManagePositions()
  {
   for(int i = PositionsTotal() - 1; i >= 0; i--)
     {
      if(PositionSelectByTicket(PositionGetTicket(i)))
        {
         if(PositionGetInteger(POSITION_MAGIC) != MagicNumber) continue;
         
         double profit = PositionGetDouble(POSITION_PROFIT);
         double currentPrice = PositionGetDouble(POSITION_PRICE_CURRENT);
         ENUM_POSITION_TYPE type = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
         
         if(profit > maxProfit) maxProfit = profit;
         
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
   
   OrderSend(request, result);
  }

//+------------------------------------------------------------------+
//| Count Trades                                                     |
//+------------------------------------------------------------------+
int CountTrades()
  {
   int count = 0;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
     {
      if(PositionSelectByTicket(PositionGetTicket(i)))
        {
         if(PositionGetInteger(POSITION_MAGIC) == MagicNumber) count++;
        }
     }
   return count;
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
//| Deinitialization                                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   Print("╔═══════════════════════════════════════════════════════════════════╗");
   Print("║           ★ NJABULO TREND ROBOT STOPPED ★                       ║");
   Print("║           Total Trades: ", totalTrades, "                       ║");
   Print("║           Win Rate: ", GetWinRate(), "%                       ║");
   Print("║           Total Profit: $", totalProfit, "                           ║");
   Print("╚═══════════════════════════════════════════════════════════════════╝");
  }
//+------------------------------------------------------------------+
