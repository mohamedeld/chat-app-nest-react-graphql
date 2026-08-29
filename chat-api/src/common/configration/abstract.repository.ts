import { Logger, NotFoundException } from '@nestjs/common';
import { QueryFilter, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON();
  }

  async findOne(filterQuery: QueryFilter<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>();

    if (!document) {
      this.logger.warn(
        `Document was not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );

      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: QueryFilter<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>();

    if (!document) {
      this.logger.warn(
        `Document was not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );

      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: QueryFilter<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>();
  }

  async findOneAndDelete(
    filterQuery: QueryFilter<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>();

    if (!document) {
      this.logger.warn(
        `Document was not found with filterQuery: ${JSON.stringify(filterQuery)}`,
      );

      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async exists(filterQuery: QueryFilter<TDocument>): Promise<boolean> {
    const document = await this.model.exists(filterQuery);

    return !!document;
  }

  async count(filterQuery: QueryFilter<TDocument>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  }

  async deleteMany(filterQuery: QueryFilter<TDocument>): Promise<void> {
    await this.model.deleteMany(filterQuery);
  }
}
