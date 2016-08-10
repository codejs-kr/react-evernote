var data = '<p>[16.07.25] 자체 구현 관련</p><ul><li>이슈&nbsp;<a href="https://github.com/andyet/SimpleWebRTC/issues/282">https://github.com/andyet/SimpleWebRTC/issues/282</a></li><li>예제&nbsp;<a href="http://webrtc.github.io/samples/src/content/peerconnection/multiple/">http://webrtc.github.io/samples/src/content/peerconnection/multiple/</a></li></ul><p>&nbsp;</p><p>[16.07.01] Multiple Stream in single PeerConnection</p><ul><li>크롬지원, 파폭 38부터 지원</li><li><a href="https://webrtc.github.io/samples/src/content/peerconnection/multiple/">https://webrtc.github.io/samples/src/content/peerconnection/multiple/</a></li><li><a href="https://hacks.mozilla.org/2015/03/webrtc-in-firefox-38-multistream-and-renegotiation/">https://hacks.mozilla.org/2015/03/webrtc-in-firefox-38-multistream-and-renegotiation/</a></li><li><a href="https://hacks.mozilla.org/2013/07/webrtc-and-the-early-api/">https://hacks.mozilla.org/2013/07/webrtc-and-the-early-api/</a></li></ul><p>&nbsp;</p><p>[16.04.12] Safari WebRTC (<a href="http://webrtcbydralex.com/index.php/2016/02/29/webrtc-in-safari-a-follow-up/">http://webrtcbydralex.com/index.php/2016/02/29/webrtc-in-safari-a-follow-up/</a>)</p><ul><li>2015 6월 애플은 전용 GetUserMedia 와 MediaStreams Object 를 Mac과 iOS 에 준비했다. (오로지 safari에서 동작)</li><li>2016 safari 9.0.3 버전 이상 에서 GetUserMedia API를 확인가능하지만 권한때문에 확인은 안될것이라고함.</li><li><p>WebRTC 후발주자인 애플이 작년, WebRTC에 대한 스팩을 검토하고있고 전문 개발자를 채용한다는 소식을 접했었는데요.&nbsp;</p><p>어제 날짜 기사에 WebRTC를 브라우저에 포함하려는 준비가 계속되고 있다고 합니다.</p><p>그리고 구현체는 2016년 말이나 2017년에 볼수 있을것 이라고 합니다.</p><p>관계자 인터뷰 내용 (<a target="_blank" href="https://bloggeek.me/microsoft-apple-webrtc/">링크</a>),&nbsp;<strong>어제자 기사 원문 (<a target="_blank" href="http://www.theregister.co.uk/2016/04/13/apple_rolling_webrtc_into_webkit/?mt=1460595040636">링크</a>)</strong><br />&nbsp;</p></li></ul><p>[16.03.31] ORTC with WebRTC</p><ul><li><a href="http://hookflash.com/home#roadmap">http://hookflash.com/home#roadmap</a></li><li><a href="https://github.com/openpeer">https://github.com/openpeer</a></li></ul><p>&nbsp;</p><p>&nbsp;</p><p>[16.03.11] H.264 코덱 플레그 활성화</p><ul><li>크롬 카나리아 51버전에 chrome://flags/</li><li>플래그 활성: WebRTC H.264 software video encoder/decoder</li><li>안드로이드 하드웨어 가속을 사용하는 디바이스에선 H.264가 기본으로 SDP에 설정되어있다.</li><li>크롬 to 크롬 우선순위는 vp8 -&gt; vp9 -&gt; h.264임</li><li>h.264, vp9은 크롬 48부터 지원한다고 하지만 어떠한 사용 설정도 할 수 없었음.</li><li>크롬 52버전에서 기본설정 상태에서도 h.264사용됨 확인 (16.08.08)</li></ul><p>&nbsp;</p><p>[16.02.11] WebRTC 스팩 변경 사항 (<a href="https://webrtchacks.com/getusermedia-resolutions-3/">https://webrtchacks.com/getusermedia-resolutions-3</a>)</p><ul><li>MediaStream.stop()&nbsp;was&nbsp;<a href="https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en">deprecated in Chrome</a>&nbsp;in favor of the new&nbsp;MediaStreamTrackobject with&nbsp;MediaStreamTrack.stop()</li><li>MediaStreamTrack.getSources()&nbsp;was&nbsp;<a href="https://www.chromestatus.com/feature/4765305641369600">deprecated in Chrome</a>&nbsp;in favor ofMediaDevices.enumerateDevices()</li><li>The&nbsp;<a href="https://w3c.github.io/mediacapture-main/getusermedia.html#media-track-supported-constraints">getUserMedia constraints</a>&nbsp;object spec changed, with FireFox supporting the latest&nbsp;spec and Chrome still on the old one</li></ul><p>&nbsp;</p><p>[16.01.11] chrome 47 getUserMedia 변경사항</p><ul><li>개발환경: getUserMedia() 메서드 호출이 IP일경우 안되며 localhost에서만 허용.</li><li>실환경: getUserMedia() 메서드는 HTTPS + 도메인이 있어야 한다.</li></ul><p>&nbsp;</p><p>[16.01.11] playRTC에서 말하는 WebRTC 한계와 알아둬야할 부분. (<a href="https://www.playrtc.com/ko/documents-ko/playrtc-feature-map-ko/">링크</a>)</p><ul><li>Chromium의 Data Channel 및 SCTP 구현의 문제로 Data Channel이 네트워크 속도 전체를 활용하지 못하는 현상이 있음.<br />- https://code.google.com/p/webrtc/issues/list?q=label:SCTP</li><li>브라우저에서 Data Channel을 이용한 파일전송시 이론적인 한계는 기기의 메모리 한계와 같으나 실사용에서는 20~50M 전후의 크기를 안정적으로 보낼 수 있음.</li><li>안드로이드에서 Data Channel을 이용한 파일전송시 이론적인 한계는 기기의 저장 한계와 같으나 실사용에서는 10M 전후의 크기를 안정적으로 보낼 수 있음.</li><li>iOS에서는 H264 동영상 코덱이 하드웨어 가속이 되며, PlayRTC의 VP8 코덱의 경우 하드웨어 가속을 받지 못해 안드로이드, 데스크탑에 비해 품질이 일부 낮음.</li><li>Peer Connection에 있어서 브라우저가 가질수 있는 피어의 수는 이론적으로 제한이 없음. 단 데스크탑의 성능상의 문제로<br />동영상 통화시 실제 사용가능한 최대 피어의 연결수는 4 인것으로 파악됨.</li><li>Peer Connection에 있어서 iOS, Android, Explorer에서 성능상의 문제로 PlayRTC에서는 사용가능한 최대 피어의 연결수는 1로 제한되어 있음.</li></ul>';
var React = require('react');
var Article = React.createClass({
  render: function() {
    return (
      <main>
        <h1>WebRTC 클라이언트 구현 노트</h1>
        <article>
          <textarea id="editor" placeholder="컨텐츠 영역"></textarea>
        </article>
      </main>
    );
  },
  componentDidMount: function() {
    // instance, using default configuration.
    CKEDITOR.replace('editor');
    var config = CKEDITOR.config;
    var editor = CKEDITOR.instances.editor;
    console.log('config', config);

    editor.setData(data);
    config.height = '80em';
  }
});

module.exports = Article;
