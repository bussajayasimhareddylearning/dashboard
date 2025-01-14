#!/usr/bin/env bash
# Copyright 2017 The Kubernetes Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Import config.
ROOT_DIR="$(cd $(dirname "${BASH_SOURCE}")/../.. && pwd -P)"
. "${ROOT_DIR}/aio/scripts/conf.sh"

# Extract i18n messages for update check.
ng extract-i18n --output-path "${I18N_DIR}" --out-file "messages.new.xlf"

# Generate MD5 existing and new messages file
MD5_OLD=$(md5sum "${I18N_DIR}/messages.xlf" | cut -c -32)
MD5_NEW=$(md5sum "${I18N_DIR}/messages.new.xlf" | cut -c -32)

if [ $MD5_OLD != $MD5_NEW ] ; then
  mv "${I18N_DIR}/messages.new.xlf" "${I18N_DIR}/messages.xlf"
  "${AIO_DIR}/scripts/xliffmerge.sh"
  say "Translation files were updated. Commit them too."
  git add i18n
fi

# Remove extracted file for check
rm -rf "${I18N_DIR}/messages.new.xlf"
