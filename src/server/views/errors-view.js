
const validationErrorView = exports.validationErrorView = ({ location, msg, param, value, nestedErrors }) => ({
  code: 'VALIDATION',
  title: msg,
  details: `Check value of param ${param}`
})
