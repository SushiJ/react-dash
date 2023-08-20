import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

class MonthlyData {
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

@modelOptions({
  schemaOptions: { _id: false },
  options: { allowMixed: Severity.ALLOW },
})
class ProductStat {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true, unique: true })
  public productId!: string;

  @prop({ required: true })
  public yearlySalesTotal!: number;

  @prop({ required: true })
  public yearlyTotalSoldUnits!: number;

  @prop({ required: true })
  public year!: string;

  @prop({ required: true })
  public monthlyData!: [MonthlyData];

  @prop({ required: true })
  public dailyData!: [DailyData];
}

export const productStatModel = getModelForClass(ProductStat);
