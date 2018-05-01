Meteor.startup(()=> {
    if(!Container.findOne({_id: "MeteorSchool"})) {
        // 컨테이너 등록
        // _id: 컨테이너 아이디, name: 컨테이너 이름
        Container.insert({_id: "MeteorSchool", name: "MeteorSchool"});

        /// 점 등록
        // pid: 컨테이너 아이디, idx: 점의 순번, color: 각 도트의 색상
        var size = 50 * 50; // DOM에서 보여질 점의 가로, 세로 개수 결정
        for (var i=0; i<size; i++) {
            var color = i % 17 == 0 ? "black" : "white"; // 17개 점마다 검은색 점을 찍음
            Dot.insert({pid: "MeteorSchool", idx: i, color: color});
        }
    }
});