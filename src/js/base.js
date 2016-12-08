/*
  firebase interfaces
  TODO
*/
$.note = {
  createUser: function(userId, name, email) {
    firebase.database().ref('users/' + 'admin').set({
      'name': 'codeJS',
      'email': 'dodortus@gmail.com'
    });
  },
  // 저장
  setNote: function() {
    var note = {
      info: {
        "title": "노트 제목6",
        "date": "2016-01-06",
        "tags": ["개발", "WebRTC", "JavaScript", "테스트"],
        "preview": "컨텐츠 내용 입니다.",
        "isFavorite": true
      },
      content: "내용 내용 내용 컨텐츠 입니다."
    };

    // Get a key for a new Post.
    var noteKey = firebase.database().ref('users/' + 'admin').child('noteList').push().key;
    var listData = {};
    var detailData = {};
    listData[noteKey] = note.info;
    detailData[noteKey] = note.content;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref('noteList/' + 'admin').update(listData);
    firebase.database().ref('noteDetail/' + 'admin').update(detailData);
  },
  // 노트 불러오기
  getNote: function() {

  },
  // 노트 삭제
  removeNote: function() {

  }
};

// 변경 리스닝
firebase.database().ref('noteList/' + 'admin').on('value', function(data) {
  console.log('변경 리스닝', data.val());
});

// 한번 읽기
firebase.database().ref('noteList/' + 'admin').once('value').then(function(data) {
  console.log('한번 읽기', data.val());
});

// 삭제
//firebase.database().ref('noteDetail/' + 'admin/' + 'noteid').remove()
