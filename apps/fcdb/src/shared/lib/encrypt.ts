import crypto from "crypto";

type Options = {
  algorithm: string;
  key: string;
};

/**
 * @description 복호화
 * @param {string} encrypted 암호화된 값 전달
 * @param {Options} options algorithm과 key 필요
 */
export const decrypt = (encrypted: string, options: Options): string => {
  const { algorithm = "aes-256-ecb", key } = options;
  try {
    if (!key) throw new Error('복호화에 필요한 "키" 가 존재하지 않습니다.');
    const decipher = crypto.createDecipheriv(algorithm, key, null);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

/**
 * @description 암호화
 * @param {string} plain 암호화할 데이터 전달
 * @param {Options} options algorithm과 key 필요
 */
export const encrypt = (plain: string, options: Options): string => {
  const { algorithm = "aes-256-ecb", key } = options;
  try {
    if (!key) throw new Error('암호화에 필요한 "키" 가 존재하지 않습니다.');
    const cipher = crypto.createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(plain, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
