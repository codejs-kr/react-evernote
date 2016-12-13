/*
  firebase interfaces
  - 저장 firebase.database().ref('noteList/' + 'admin').update(listData);
  - 삭제 firebase.database().ref('noteDetail/' + 'admin/' + 'noteid').remove()

  TODO
  - userId 동적으로 받아오기

*/
$.note = {
  userId: null,
  createUser: function(userId, name, email) {
    firebase.database().ref('users/' + 'admin').set({
      'name': 'codeJS',
      'email': 'dodortus@gmail.com'
    });
  },
  // 신규
  createNote: function() {
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
  updateNote: function(data) {
    console.log('updateNote', arguments);
    // data.id 필수
    // data.isFavorite
    // data.tags
    // data.title
    // data.content

    var listData = {};
    var detailData = {};
    detailData[data.id] = data.content;

    // 본문 업데이트
    if (data.content) {
      firebase.database().ref('noteDetail/' + 'admin').update(detailData);
    } else {

    }
  },
  // 노트 불러오기
  readNote: function(id, callback) {
    console.log('readNote', arguments);

    firebase.database().ref('noteDetail/' + 'admin' + '/' + id).once('value').then(function(data) {
      callback && callback(data.val());
    });
  },
  // 노트 삭제
  deleteNote: function(id) {
    // data.noteId
    firebase.database().ref('noteList/' + 'admin/' + id).remove();
    firebase.database().ref('noteDetail/' + 'admin/' + id).remove();
  },
  // 노트 리스트 불러오기
  readList: function(callback) {
    // 한번 읽기
    firebase.database().ref('noteList/' + 'admin').once('value').then(function(data) {
      //console.log('한번 읽기', data.val());

      callback && callback(data.val());
    });
  }
};

// 변경 리스닝
firebase.database().ref('noteList/' + 'admin').on('value', function(data) {
  console.log('변경 리스닝', data.val());
});
