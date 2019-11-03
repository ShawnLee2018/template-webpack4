/* global  PACKAGE_NAME BUILD_VERSION  BUILD_TIME */
function init() {
  document.getElementById('msg').innerHTML = 'Hello Qjy.';
  showVersion();
}

function showVersion() {
  const line = repeatString('*', 50);
  console.log(line);
  let space = repeatString(' ', (line.length - 4 - PACKAGE_NAME.length) * 0.5);
  console.log('**' + space + PACKAGE_NAME + space + '**');
  space = repeatString(' ', (line.length - 4 - BUILD_VERSION.length) * 0.5);
  console.log('**' + space + BUILD_VERSION + space + '**');
  space = repeatString(' ', (line.length - 4 - BUILD_TIME.length) * 0.5);
  console.log('**' + space + BUILD_TIME + space + '**');
  console.log(line);
}

function repeatString(str, count) {

  if (count < 0) {
    throw new RangeError('repeat count must be non-negative');
  }
  if (count == Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }
  count = Math.floor(count);
  if (str.length == 0 || count == 0) {
    return '';
  }
  if (str.length * count >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }
  var rpt = '';
  for (;;) {
    if ((count & 1) == 1) {
      rpt += str;
    }
    count >>>= 1;
    if (count == 0) {
      break;
    }
    str += str;
  }
  return rpt;
}
window.onload = init;