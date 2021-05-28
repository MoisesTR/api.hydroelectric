export const getMessageLenght = (fieldName: string, min: number, max: number) => {
  return `The length of the ${fieldName} must be between ${min} and ${max} characters`;
};
