import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class MonthlyData {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public month!: string;

  @prop({ required: true })
  public totalSales!: number;

  @prop({ required: true })
  public totalUnits!: number;
}

class DailyData {
  @prop({ required: true })
  public date!: string;

  @prop({ required: true })
  public totalSales!: number;

  @prop({ required: true })
  public totalUnits!: number;
}

class SalesByCategory {
  @prop({ required: true })
  public shoes!: number;

  @prop({ required: true })
  public clothing!: number;

  @prop({ required: true })
  public accessories!: number;

  @prop({ required: true })
  public misc!: number;
}

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
})
class OverallStats extends TimeStamps {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public totalCustomers!: number;

  @prop({ required: true })
  public yearlySalesTotal!: number;

  @prop({ required: true })
  public yearlyTotalSoldUnits!: number;

  @prop({ required: true })
  public year!: number;

  @prop({ required: true })
  public monthlyData!: [MonthlyData];

  @prop({ required: true })
  public dailyData!: [DailyData];

  @prop({ required: true })
  public salesByCategory!: SalesByCategory;
}

export const overallStatsModel = getModelForClass(OverallStats);
