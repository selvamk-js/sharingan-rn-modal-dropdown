import * as Yup from 'yup';
export const DropdownValidation = Yup.object().shape({
  msChipFlat: Yup.array().required(),
  msChipOutlined: Yup.array().required(),
  sddWoAvatar: Yup.string().required(),
  sddWAvatar: Yup.string().required(),
  gddWoAvatar: Yup.string().required(),
  gddWAvatar: Yup.string().required(),
});
