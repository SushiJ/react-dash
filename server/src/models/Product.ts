import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
})
class Product {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public category!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public supply!: number;
}

export const productModel = getModelForClass(Product);
