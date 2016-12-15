/*
  firebase interfaces
  - CRUD
    - 사용자 저장 firebase.database().ref('users/' + 'admin').set();
    - 키생성 저장 firebase.database().ref('noteList/' + 'admin').update(listData);
    - 삭제 firebase.database().ref('noteDetail/' + 'admin/' + 'noteid').remove();
    - 리슨 firebase.database().ref('noteList/' + 'admin').on('value', function(data) {});

  - 정렬
  - 필터

  TODO
  - 인증 후 userId 동적으로 받아오기
*/
$.note = {
  userId: null,
  createUser: function(userId, name, email) {
    firebase.database().ref('users/' + 'admin').set({
      'name': 'codeJS',
      'email': 'dodortus@gmail.com'
    });
  },
  // 노트 생성
  createNote: function() {
    var currentDate = $.util.getDate(); //new Date().getTime();
    var note = {
      info: {
        "title": "",
        "date": currentDate,
        "tags": ["개발", "테그"],
        "preview": "",
        "isFavorite": false
      },
      content: ""
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
  updateTitle: function(data) {
    console.log('updateTitle', arguments);

    var listData = {
      title: data.title
    };
    firebase.database().ref('noteList/' + 'admin/' + data.id).update(listData);
  },
  // 노트 본문 수정
  updateNote: function(data) {
    console.log('updateNote', arguments);
    // data.id 필수
    // data.isFavorite
    // data.tags
    // data.title
    // data.content

    var listData = {};
    var detailData = {};
    listData.preview = data.content;
    detailData[data.id] = data.content;

    // 본문 업데이트
    if (data.content) {
      firebase.database().ref('noteDetail/' + 'admin').update(detailData);
      firebase.database().ref('noteList/' + 'admin/' + data.id).update(listData);
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
    console.log('deleteNote', id);

    firebase.database().ref('noteList/' + 'admin/' + id).remove();
    firebase.database().ref('noteDetail/' + 'admin/' + id).remove();
  },
  // 노트 리스트 불러오기
  readList: function(callback) {
    // 한번 읽기
    // 필터 .limitToLast(3)
    // 정렬
    firebase.database().ref('noteList/' + 'admin')
    .orderByChild('date').once('value').then(function(data) {
      callback && callback(data.val());
    });
  },
  // 업데이트 리스닝
  onUpdateList: null
};

firebase.database().ref('noteList/' + 'admin').on('value', function(data) {
  console.log('변경 리스닝', data.val());
  $.note.onUpdateList(data.val());
});
