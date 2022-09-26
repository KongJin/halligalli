const { S3_UPLOAD_BUCKET, S3_UPLOAD_REGION } = process.env;

export const imgUrl = (el: string) => `https://${S3_UPLOAD_BUCKET}.s3.${S3_UPLOAD_REGION}.amazonaws.com/${el}`;

export const take = 8;
