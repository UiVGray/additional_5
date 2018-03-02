module.exports = function check(str, bracketsConfig) {
  let OpenTokens = [];
  let CloseTokens = [];

  for(i = 0; i < bracketsConfig.length; i++) {
    OpenTokens[OpenTokens.length] = bracketsConfig[i][0];
    CloseTokens[CloseTokens.length] = bracketsConfig[i][1];
  }
  function checkConsistency(begin, end) {
    if(end - begin <= 0) {
      return true;
    }
    let b = begin;
    let e = end;
    let result = true;
    let g = 0;
    while (b < end) {
    g = 0;
    for(i = b; i < e; i++) {
      if(OpenTokens.indexOf(str[i]) !== -1) {
        g = 1;
        begin = i;
        break;
      }
      if(CloseTokens.indexOf(str[i]) !== -1) {
        return false;
      }
    }
      let tokenIndex = OpenTokens.indexOf(str[begin]);
      let CloseToken = CloseTokens[tokenIndex];
      let OpenToken = OpenTokens[tokenIndex];
      for(i = begin+1; i < end; i++) {
        if(str[i] == CloseToken) {
          g = g - 1;
        } else if(str[i] == OpenToken) {
          g = g + 1;
        }
        if(g == 0) {
          b = i + 1;
          result &= checkConsistency(begin + 1, i)
          break;
        }
      }
      if(g !== 0) {
        return false;
      }
      if(result == false) {
        return false;
      }
    }
    return result;
  }
  return checkConsistency(0, str.length);
}