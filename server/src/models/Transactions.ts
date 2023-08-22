import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
})
class Transactions extends TimeStamps {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public cost!: number;

  @prop({ required: true })
  public products!: [string];
}

export const transactionsModel = getModelForClass(Transactions);
