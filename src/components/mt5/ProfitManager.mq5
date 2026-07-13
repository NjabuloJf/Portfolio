//+------------------------------------------------------------------+
//|                                              ProfitManager.mq5   |
//|                        Copyright 2026, Njabulo Jb                 |
//+------------------------------------------------------------------+
#property copyright "Copyright 2026, Njabulo Jb"
#property version   "1.00"

//+------------------------------------------------------------------+
//| Profit Management Functions                                       |
//+------------------------------------------------------------------+
class ProfitManager
{
private:
   double targetProfit;
   double currentProfit;
   bool   isRunning;
   
public:
   ProfitManager() { targetProfit = 0; currentProfit = 0; isRunning = false; }
   ~ProfitManager() {}
   
   void SetTarget(double target) { targetProfit = target; }
   bool IsProfitReached() { return currentProfit >= targetProfit; }
   void UpdateProfit(double profit) { currentProfit = profit; }
   void Start() { isRunning = true; }
   void Stop() { isRunning = false; }
   bool IsRunning() { return isRunning; }
};

//+------------------------------------------------------------------+
//| Risk Management                                                   |
//+------------------------------------------------------------------+
class RiskManager
{
private:
   double maxRisk;
   double currentRisk;
   bool   stopLossEnabled;
   
public:
   RiskManager() { maxRisk = 5.0; currentRisk = 0; stopLossEnabled = true; }
   
   void SetMaxRisk(double risk) { maxRisk = risk; }
   bool IsRiskAcceptable(double potentialLoss) 
   { 
      return potentialLoss <= maxRisk; 
   }
   void UpdateRisk(double loss) { currentRisk += loss; }
   void Reset() { currentRisk = 0; }
};
