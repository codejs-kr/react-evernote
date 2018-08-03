/*!
 *
 * firebase interfaces
 * @author dodortus (codejs.co.kr / dodortus@gmail.com)
 *
 */

/*
  - CRUD
    - 사용자 저장 firebase.database().ref('users/' + {userID}).set();
    - 저장, 갱신 firebase.database().ref('noteList/' + {userID}).update();
    - 읽기 firebase.database().ref('noteList/' + {userID}).once('value').then(function(data) {});
    - 삭제 firebase.database().ref('noteList/' + {userID} + '/' + {noteID}).remove();
    - 리슨 firebase.database().ref('noteList/' + {userID}).on('value', function(data) {});

  - 필터
    - firebase.database().ref('noteList/admin').orderByChild('title').equalTo('수박').once('value')
      .then(function(data) { console.log(data.val()); });

  TODO
  - 인증 후 userId 동적으로 받아오기
*/

// initialize
(function() {
  var config = {
    apiKey: "AIzaSyC78fW3A4NOEH9nD9_NzUW1n8Z0Vfx0O_c",
    authDomain: "codejs-evernote.firebaseapp.com",
    databaseURL: "https://codejs-evernote.firebaseio.com",
    storageBucket: "codejs-evernote.appspot.com",
    messagingSenderId: "1079024052510"
  };

  // init firebase
  firebase.initializeApp(config);

  // listen
  firebase.database().ref('noteList/' + 'admin').orderByChild('lastUpdateDate').on('value', function(data) {
    var result = [];

    data.forEach(function(list) {
      result.unshift(list.val());
    });

    console.log('변경 리스닝', result);
    $.note.onUpdateList(result);
  });
})();

// note api
$.note = {
  userId: null,
  createUser: function(userId, name, email) {
    firebase.database().ref('users/' + 'admin').set({
      'name': 'codeJS',
      'email': 'dodortus@gmail.com',
      'createDate': $.util.getTime()
    });
  },
  // 노트 생성
  createNote: function() {
    var currentDate = $.util.getTime();
    var note = {
      info: {
        "title": "",
        "createDate": currentDate,
        "lastUpdateDate": currentDate,
        "tags": [],
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
    listData[noteKey].id = noteKey;
    detailData[noteKey] = note.content;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref('noteList/' + 'admin').update(listData);
    firebase.database().ref('noteDetail/' + 'admin').update(detailData);
  },
  updateFavorite: function(data) {
    var listData = {
      isFavorite: data.isFavorite,
      lastUpdateDate: $.util.getTime()
    };

    firebase.database().ref('noteList/' + 'admin/' + data.id).update(listData);
  },
  updataTags: function(data) {
    var listData = {
      tags: data.tags,
      lastUpdateDate: $.util.getTime()
    };

    firebase.database().ref('noteList/' + 'admin/' + data.id).update(listData);
  },
  updateTitle: function(data) {
    console.log('updateTitle', arguments);

    var listData = {
      title: data.title,
      lastUpdateDate: $.util.getTime()
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
    listData.preview = data.content.slice(0, 150);
    listData.lastUpdateDate = $.util.getTime();
    detailData[data.id] = data.content;

    // 본문 업데이트
    firebase.database().ref('noteDetail/' + 'admin').update(detailData);
    firebase.database().ref('noteList/' + 'admin/' + data.id).update(listData);
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
    var result = [];
    firebase.database().ref('noteList/' + 'admin')
    .orderByChild('lastUpdateDate')
    .once('value').then(function(data) {

      data.forEach(function(list) {
        result.unshift(list.val());
      });

      //console.log('데이터', result);
      callback && callback(result);
    });
  },
  // 업데이트 리스닝
  onUpdateList: null
};