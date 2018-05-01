// container 템플릿 생성시 dots 컬렉션 구독 시작
Template.container.onCreated (function() {
    var self = this;
    self.dotsSub = self.subscribe("dots", "MeteorSchool")
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
    }
});