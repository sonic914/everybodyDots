Template.dot.events ({
    "mousedown div, touchstart div" (evt, tmpl) {
        Session.set("dragMode", true);
        Dot.update({_id: this._id}, {$set: {color: Session.get("selectedColor")}});
        evt.preventDefault(); // 기본 이벤트를 무시하여 마우스 포인터가 화살표로 유지되게 함
    },
    "mousemove div, touchmove div" (evt, tmpl) {
        if(Session.get("dragMode")) {
            Dot.update({_id: this._id}, {$set: {color: Session.get("selectedColor")}});
        }
        evt.preventDefault();
    },
    "mouseup div, touchend div" (evt, tmpl) {
        Session.set("dragMode", false);
        evt.preventDefault();
    }
});