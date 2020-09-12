/*
    citation_reg
    basic square or round brackets, year, optional volume, identifier, integer
*/
const citation_reg = /((?:(\[|\()\d{4}(\]|\))\s*)(\d\s)?(?:([a-zA-Z]{1,7}))(?:\s*(\d{1,6})))[,;.\s]/g;

/*
    regDoubleCites
    one citation followed by another
    separated by comma or semi colon
*/
const regDoubleCites = /(\[|\()\d{4}(\]|\))[\s\S](\d{0,3}[\s\S])\w{1,5}[\s\S]\d{1,5}(([\s\S]\(\w*\))?)(;|,)\s(\[|\()\d{4}(\]|\))[\s\S](\d{0,3}[\s\S])\w{1,5}[\s\S]\d{1,5}(([\s\S]\(\w*\))?)/g;

/*  
    regNeutralCite
    strict neutral citations only. known court identifiers only - no law reports.
    includes trailing integer
    square brackets required 
*/
const regNeutralCite = /((?:\[\d{4}\]\s*)(?:(NZACC|NZDC|NZFC|NZHC|NZCA|NZSC|NZEnvC|NZEmpC|NZACA|NZBSA|NZCC|NZCOP|NZCAA|NZDRT|NZHRRT|NZIACDT|NZIPT|NZIEAA|NZLVT|NZLCDT|NZLAT|NZSHD|NZLLA|NZMVDT|NZPSPLA|NZREADT|NZSSAA|NZSAAA|NZTRA|(NZTT\s\w*\w)))(?:\s*(\w{1,8})))|(CA\s?\d+\/\d+)/g;

/*
    regNeutralCitation
    pattern that will determine year reliably (year followed by court identifier)
    excluding trailing integer
    square or round brackets
    USED PRIMARILY TO GET YEAR OF DECISION
*/
const regNeutralCitation = /([[|(]?)(\d{4})([\]|)]?)\s?(\d*\s)?(SC|RMA|NZELC|NZBLC|NZRA|NZCR|ERNZ|NZELR|IPR|NZCLC|NZRMA|CRNZ|FRNZ|ELRNZ|HRNZ|TCLR|NZAR|PRNZ|NZTRA|NZTR|NZTC|NZACC|ACC|NZDC|NZFC|NZHC|HC|NZCAA|NZCA|NZSC|NZEnvC|NZEmpC|NZACA|NZBSA|NZCCLR|NZCC|NZCOP|NZDRT|NZHRRT|NZIACDT|NZIPT|NZIEAA|NZLVT|NZLCDT|NZLAT|NZSHD|NZLLA|NZMVDT|NZPSPLA|NZREADT|NZSSAA|NZSAAA)|(CA\s?\d+\/\d+)/;

/*
    regOtherCitation
    SC or CA followed by digits including identifier and year eg 20/2005
    UNUSED as at 7/9/2020
*/
const regOtherCitation = /(?:SC|CA\w*)(\s\d{1,3})?[/](\d{4})/;

/* 
    otherCite
    NZ neutral citation or COA/SC type citation
    used for finding citation in long name strings (eg from JDO case names)
*/
const otherCite = /((\[\d{4}\])(\s*)NZ(D|F|H|C|S|L)(A|C|R)(\s.*?)(\d+))|((HC|DC|FC) (\w{2,4} (\w{3,4}).*)(?=\s\d{1,2} ))|(COA)(\s.{5,10}\/\d{4})|(SC\s\d{0,5}\/\d{0,4})/;

export { citation_reg, regDoubleCites, regNeutralCite, regNeutralCitation, regOtherCitation, otherCite };
