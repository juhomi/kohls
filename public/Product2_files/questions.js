$BV.Internal.ajaxCallback(function(url,apiConfig){
if(!/(^|\.)(bazaarvoice\.com|kohls\.com|kohlsecommerce\.com)(:\d+)?$/.test(location.hostname)){
throw "Bazaarvoice: Permission denied";
}
$BV.Internal.configureAppLoader("qa",false,{"cmn/9025/photoDisplay":"photoDisplay","cmn/9025/qaZeroDeploy":"qaZeroDeploy"});
$BV.Internal.require(["injection.shared","feedback","requester","browserVersion","qa/contentFocusingSupportQA","jquery.core","qa/analyticsHooksQA","qa/analyticsInternalLegacyHooksQA","dropdown","domUtils","parseUri","cookies","analyticsVersioning","apiCore","analyticsHooks","analyticsAutoTagHooks","jquery.effects.core","animationOptions","contentDisplay","contentFocusingSupport"],function(Injection){
var materials={"BVQASourceID":"<div id=\"BVQAWidgetID\" class=\"BVQAWidget\"><div id=\"BVQABrowsePageID\" class=\"BVQAWidgetWrapper BVQABrowsePage\"><div id=\"BVQAHeaderID\" class=\"BVQAHeader\"><div id=\"BVQAQuestionAndAnswerCountID\" class=\"BVQAQuestionAndAnswerCount\">(<span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Questions<\/span> : <span class=\"BVQACount BVQAZeroCount\"><span class=\"BVQANumber\">0<\/span> Answers<\/span>)<\/div><h1 id=\"BVQAHeaderTitleID\" class=\"BVQATitle BVQAHeaderTitle\">Product Q&amp;A<\/h1><h2 id=\"BVQAHeaderSubTitleID\" class=\"BVQASubTitle BVQAHeaderSubTitle\">Ask your questions. Share your answers.<\/h2><\/div><div id=\"BVQAMainID\" class=\"BVQAMain BVQAMainView\"><div class=\"BVQAPageTabs\"> <div class=\"BVQAPageTabSpacerLeft\">&nbsp;<\/div>\n\n <div class=\"BVQAPageTabSpacerMiddle\">&nbsp;<\/div>\n<div id=\"BVQAPageTabBrowseID\" class=\"BVQAPageTab BVQASelectedPageTab\">&laquo; Back<\/div> <div class=\"BVQAPageTabSpacerMiddle\">&nbsp;<\/div>\n<div id=\"BVQAPageTabSearchID\" class=\"BVQAPageTab\" onclick=\"$BV.Internal.Requester.get('http://kohls.ugc.bazaarvoice.com/answers/9025/product/907678/searchquestions.djs?format=embeddedhtml&amp;search=__SEARCHTEXT__','BVQAFrame','__CONFIGKEY__'); return false;\"><a title=\"Search Q&amp;A\" data-bvcfg=\"__CONFIGKEY__\" name=\"BV_TrackingTag_QA_Display_SearchTab\" data-bvjsref=\"http://kohls.ugc.bazaarvoice.com/answers/9025/product/907678/searchquestions.djs?format=embeddedhtml&amp;search=__SEARCHTEXT__\" class=\"BVQAPageTabLink\" href=\"javascript://\">Search Q&amp;A<\/a><\/div>\n <div class=\"BVQAPageTabSpacerRight\">&nbsp;<\/div>\n<\/div><div id=\"BVQAViewQuestionsContentID\" class=\"BVQAMainContent BVQAViewQuestionsContent\"><div id=\"BVQANoQuestionsID\" class=\"BVQANoQuestions\"><div class=\"BVQATitle\">Be the first to ask a question!<\/div><a title=\"Ask a new question \" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://kohls.ugc.bazaarvoice.com/answers/9025/product/907678/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fkohls.ugc.bazaarvoice.com%2Fanswers%2F9025%2Fproduct%2F907678%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskFirstQuestion\" onclick=\"bvShowContentOnReturnQA('9025', '907678', 'BVQAWidgetID');return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\"><img src=\"http://kohls.ugc.bazaarvoice.com/answers/9025/static/buttonAskANewQuestion.gif\" alt=\"Ask a new question \" title=\"Ask a new question \" /><\/a><\/div><\/div><\/div><div id=\"BVQAFooterID\" class=\"BVQAFooter\"><div id=\"BVQAGuidelinesID\" class=\"BVQAGuidelines\"><a name=\"BV_TrackingTag_QA_Display_QAndAGuidelines\" href=\"http://answers.kohls.com/answers/9025/content/guidelines.htm\" target=\"_blank\" onclick=\"window.open(this.href,null,'left=50,top=50,width=500,height=500,toolbar=1,location=0,resizable=1,scrollbars=1'); return false;\" title=\"Policies &amp; Guidelines\">Policies &amp; Guidelines<\/a><\/div><\/div><\/div><\/div>","BVQASummaryBoxSourceID":"<div id=\"BVQASummaryBoxID\" class=\"BVQASummaryBox BVQASummaryBoxView\"><h1 id=\"BVQASummaryBoxTitleID\" class=\"BVQATitle BVQASummaryBoxTitle\">Product Questions &amp; Answers<\/h1><div id=\"BVQASummaryBoxAskFirstQuestionID\" class=\"BVQASummaryBoxLink\">Be the first to <a title=\"Ask a question\" data-bvcfg=\"__CONFIGKEY__\" data-bvjsref=\"http://kohls.ugc.bazaarvoice.com/answers/9025/product/907678/askquestion.djs?format=embeddedhtml&amp;campaignid=BV_QA_BROWSE&amp;sessionparams=__BVSESSIONPARAMS__&amp;return=__RETURN__&amp;innerreturn=http%3A%2F%2Fkohls.ugc.bazaarvoice.com%2Fanswers%2F9025%2Fproduct%2F907678%2Fquestions.djs%3Fformat%3Dembeddedhtml&amp;user=__USERID__&amp;authsourcetype=__AUTHTYPE__&amp;submissionparams=__BVSUBMISSIONPARAMETERS__&amp;submissionurl=__BVSUBMISSIONURL__\" name=\"BV_TrackingTag_QA_Display_AskQuestion\" onclick=\"return typeof(BVQAOnSubmit)=='function' ? BVQAOnSubmit(this.href, 'QUESTION_SUBMISSION') : true;\" href=\"javascript://\">ask a question<\/a><\/div><\/div>"},
initializers={"BVQASourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}],"BVQASummaryBoxSourceID":[{"module":"requester","data":{},"init":"bindJsLinks"}]},
widgets={};
widgets["content"]={"handledContentTypes":["Question","Answer"],"containerId":"BVQAContainer","sourceId":"BVQASourceID"};
widgets["socialSummary"]={"containerId":"BVQASocialSummaryContainer","sourceId":"BVQASocialSummarySourceID"};
widgets["summary"]={"containerId":"BVQASummaryContainer","sourceId":"BVQASummaryBoxSourceID"};
var injectionData={
apiConfig:apiConfig,
containerInitializer:false,
cookiePath:"/",
crossDomainUrl:"http://kohls.ugc.bazaarvoice.com/answers/9025/crossdomain.htm?format=embedded",
embeddedUrl:url,
globalInitializers:[{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQAContainer"}},{"module":"browserVersion","init":"initialize","data":{"useBodyTag":false,"containerId":"BVQASummaryContainer"}},{"module":"dropdown","init":"addSelectHandlers","data":{"dropdownId":"BVQASortListID"}},{"module":"feedback","init":"onInjection","data":{"id":"Product_2lbk0umuv0rm85slyz776sgr7","options":{"cookiePrefixes":{"Voting":"pfv"},"cookiePath":"/","contentFocusing":{"args":["9025","907678"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Question_2lbk0umuv0rm85slyz776sgr7","options":{"cookiePrefixes":{"Inappropriate":"qif","Voting":"qfv"},"cookiePath":"/","contentFocusing":{"args":["9025","907678"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"feedback","init":"onInjection","data":{"id":"Answer_2lbk0umuv0rm85slyz776sgr7","options":{"cookiePrefixes":{"Inappropriate":"aif","Voting":"afv"},"cookiePath":"/","contentFocusing":{"args":["9025","907678"],"fn":"bvShowContentOnReturnQA"}}}},{"module":"qa/contentFocusingSupportQA","init":"postInjection","data":{"application":"QA","source":"readLink","defaultContentContainerId":"BVQAContainer","tabSwitcher":"bvShowTab","displayCode":"9025"}}],
gotoCookieRegexp:/^https?:\/\/[^/?#]+(\/[^?#]*)\//,
inFrameSubmissionEnabled:false,
pageIdPrefix:"BVQA",
pageTrackers:["http://kohls.ugc.bazaarvoice.com/answers/9025/static/q_0_ispacer.gif","http://kohls.ugc.bazaarvoice.com/answers/9025/static/a_0_ispacer.gif"],
postInjectionFunction:function(Inject){
if (window.$bv.isFunction(window.bvClosePopups)) {
window.$bv('.BVQAQuestionHeader').click(window.bvClosePopups);
}
if (window.bvAppendSubmission) {
window.bvAppendSubmission.showContent('QA');
}
},
replaceDisplayTokens:true,
replacementsPrefix:"BVQA",
replaceSessionParameters:false,
setWindowTitle:false,
soiContainerID:"BVQAContentValidationID_907678",
soiContentIDs:[],
sviParameterName:"bvqap",
sviRedirectBaseUrl:"",
webAnalyticsConfig:{"customTrackedObjects":"","customizersName":"BVQAAnalyticsCustomizers","customContainersFnName":"BVQAAnalyticsCustomContainers","conversionTracking":{"conversionTrackingElementSelector":null,"conversionTrackingMetadataSelector":null,"conversionTrackingParseRegexp":null,"conversionTrackingName":"AddToCart"},"SIWZeroDeployEnabled":false,"maxTrackingTagTraversalDepth":3,"customTrackedObjectsSelector":"","jsonData":{"bvProduct":"AskAndAnswer","autoTagAnalyticsConfiguration":{"trackSubmissionPageLoads":true,"autoTagAnalyticsVersion":"4.5","trackFormActions":false,"productTracking":{"tracking":true,"initialProductDisplay":false},"vendors":[{"vendorName":"omniture","eventNum":15,"eVarNum":34,"trackerReference":"s","brandVoiceTrackingType":null,"brandVoiceTrackingEVarNum":0}]},"bvExtension":{},"bvAnalyticsVersion":"","productId":"907678","eType":"Read","bvDisplayCode":"9025","rootCategoryId":"BV_MISCELLANEOUS_CATEGORY","subjectType":"Product","brand":"","analyticsWhitespaceTrackingEnabled":false,"attributes":{"numQuestions":0,"numAnswers":0},"ciTrackingEnabled":false,"bvClientName":"Kohls","leafCategoryId":"BV_MISCELLANEOUS_CATEGORY"}},
widgetInitializers:initializers,
widgetLimit:1,
widgetMaterials:materials,
widgetMetadata:widgets,
windowTitle:null};
Injection.newInstance().apiInjection(injectionData);
});
});