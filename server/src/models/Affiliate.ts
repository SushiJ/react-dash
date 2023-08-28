import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
})
class Affiliate {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public affiliateSales!: [string];
}

export const affiliateModel = getModelForClass(Affiliate);
