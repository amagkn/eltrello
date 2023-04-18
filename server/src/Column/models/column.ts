import { model, Schema } from 'mongoose';
import { ColumnDocument } from '../../app/types/column.interface';

const columnSchema = new Schema<ColumnDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const ColumnModel = model<ColumnDocument>('Column', columnSchema);
