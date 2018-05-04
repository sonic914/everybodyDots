// container 템플릿 생성시 dots 컬렉션 구독 시작
Template.container.onCreated (function() {
    var self = this;
    subl = self.subscribe("dots", "MeteorSchool") // 구독 핸들러 subl을 전역으로 저장하기
});

// container 템플릿 제거시 dots 컬렉션 구독 중지
Template.container.onDestroyed (function () {
    var self = this;
    self.dotsSub.stop();
});

// container 템플릿 헬퍼
// dots() pid가 MeteorSchool인 도트의 idx를 내림차순으로 리턴함
Template.container.helpers ({
    dots() {
        return Dot.find({pid: "MeteorSchool"}, {sort: {idx: 1}});
    },
    currentColor () {
        return Session.get("selectedColor");
    }
});

Template.container.events ({
    "click button[name=reset]" (evt, tmpl) {
        Meteor.call("resetContainer", "MeteorSchool", Session.get("selectedColor"), function (err, result) {
            console.log (err, result);
        });
    }
});