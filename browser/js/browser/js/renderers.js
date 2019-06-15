@@ -4,7 +4,7 @@ function renderMessage (message, direction, time, type) {
    text: renderMessageAsText,
    like: renderMessageAsLike,
    media: renderMessageAsImage,
    reel_share: renderMessageAsReelShare,
    reel_share: renderMessageAsUserStory, // replying to a user's story
    link: renderMessageAsLink
  }

@@ -21,7 +21,7 @@ function renderMessage (message, direction, time, type) {
  if (!type && typeof message === 'string') type = 'text';

  if (renderers[type]) renderers[type](divContent, message);
  else renderMessageAsText(divContent, '<unsupported message format type '+type+'> '+JSON.stringify(message), true);
  else renderMessageAsText(divContent, '<unsupported message format>', true);

  divContent.appendChild(dom(
    `<p class="message-time">
@@ -70,16 +70,21 @@ function renderPost (post) {
  showInViewer(postDom);
}

function renderMessageAsReelShare (container, message) {
  if (message._params.reelShare.media.video_versions) {
    var url = typeof message === 'string' ? message : message._params.reelShare.media.video_versions[0].url
    var img = dom(`<video controls src="${url}">`);
function renderMessageAsUserStory (container, message) {
  if (message._params.reelShare.media.image_versions2) {
    var url = message._params.reelShare.media.image_versions2.candidates[0].url
    var img = dom(`<img src="${url}">`);
    img.onload = () => scrollToChatBottom();
    container.appendChild(img);
    container.classList.add('ig-media');

    container.addEventListener('click', () => {
      showInViewer(dom(`<video controls src="${url}">`));
      if (message._params.reelShare.media.video_versions) {
        const videoUrl = message._params.reelShare.media.video_versions[0].url;
        showInViewer(dom(`<video controls src="${videoUrl}">`));
      } else {
        showInViewer(dom(`<img src="${url}">`));
      }
    })
  }
