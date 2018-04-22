import arrayToSentence from 'array-to-sentence'

const errorsToSentence = (errors) => {
  console.log(errors)
  if(Array.isArray(errors)){
    return arrayToSentence(errors)
  }
  var allErrors = ''
  Object.keys(errors).forEach((key, index) => {
    const comma = (index === 0) ? '' : ','
    const titledKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
    allErrors = `${allErrors}${comma} ${titledKey} ${arrayToSentence(errors[key])}`
  })
  return allErrors + '!'
}

export default errorsToSentence
