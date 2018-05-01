Dot.allow ({
    update (userId, doc) {
        // 항목의 존재여부만 체크
        return doc._id && doc.pid && doc.idx && doc.color;
    }
});