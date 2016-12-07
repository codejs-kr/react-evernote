/*
  firebase interfaces

  TODO
*/
$.note = {
  createUser: function(userId, name, email) {
    firebase.database().ref('users/' + 'admin').set({
      'username': '관리자',
      'email': 'admin@evernote.com'
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
    var noteKey = firebase.database().ref('users/' + 'admin').child('note-list').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    note.info.noteKey = noteKey;
    updates['/note-list/' + noteKey] = note.info;
    updates['/note-detail/' + noteKey] = note.content;
    return firebase.database().ref('users/' + 'admin').update(updates);
  },
  // 노트 불러오기
  getNote: function() {

  },
  // 노트 삭제
  removeNote: function() {

  }
};
