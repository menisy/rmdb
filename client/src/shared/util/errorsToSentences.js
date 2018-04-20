import arrayToSentence from 'array-to-sentence'

const errorsToSentence = (errors) => {
  if(Array.isArray(errors)){
    return arrayToSentence(errors)
  }
  var allErrors = ''
  Object.keys(errors).forEach((key, index) => {
    const comma = (index == 0) ? '' : ','
    allErrors = `${allErrors}${comma} ${key} ${arrayToSentence(errors[key])}`
  })
  return allErrors
}

export default errorsToSentence
