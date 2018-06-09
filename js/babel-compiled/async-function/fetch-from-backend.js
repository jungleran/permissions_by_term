'use strict';

/**
 * @returns array
 */
var fetchFromBackend = async function fetchFromBackend() {
  var contentType = null;
  if (window.location.href.indexOf('/node/add') !== -1) {
    contentType = window.location.href.split("/").pop();
  }

  var url = '/admin/permissions-by-term/access-info-by-url?url=' + window.location.pathname;
  if (contentType !== null) {
    url = '/admin/permissions-by-term/access-info-by-content-type/' + contentType;
  }

  return await fetch(url, { credentials: 'include' }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data;
  });
};