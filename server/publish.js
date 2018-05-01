Meteor.publish("dots", function(pid) {
    // 컨테이너 아이디를 기준으로 도트정보를 개시함
    return Dot.find({pid: pid});
});