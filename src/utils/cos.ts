import COS from 'cos-js-sdk-v5';

const BUCKET_NAME = 'test-1304439477';
const REGION = 'ap-chengdu';

const cos = new COS({
  SecretId: 'AKIDJODQ7skNlaBWaVEVnW5NSJuMvPPsoAQS',
  SecretKey: '5yczDmyF5jBxTr2zRQGqdGl37sDwSu2u',
});

export function cosUpload(fileName: string, file: any) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: BUCKET_NAME /* 必须 */,
        Region: REGION /* 存储桶所在地域，必须字段 */,
        Key: fileName /* 必须 */,
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        },
      },
      function (err, data) {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
}

export function cosDown(fileName: string) {
  return new Promise((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: BUCKET_NAME, /* 填入您自己的存储桶，必须字段 */
      Region: REGION,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      Key: fileName,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
  }, function(err, data: any) {
      if (err) reject(err)
      /* url为对象访问url */
      resolve(data.url)
  });
  });
}
