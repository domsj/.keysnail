var PLUGIN_INFO =
<KeySnailPlugin>
    <name>KeySnail Plugin for splitting windows</name>
    <description>Hello KeySnail Plugin!</description>
    <description lang="ja">はじめての KeySnail プラグインです</description>
    <version>0.1</version>
    <updateURL>https://gist.github.com/raw/193286/5aaf521c1f2627a54e4f622e67aedd1538ec5907/gistfile1.js</updateURL>
    <iconURL>http://github.com/mooz/keysnail/raw/master/plugins/icon/hello-plugin.icon.png</iconURL>
    <author mail="stillpedant@gmail.com" homepage="http://d.hatena.ne.jp/mooz/">mooz</author>
    <license>The MIT License</license>
    <license lang="ja">MIT ライセンス</license>
    <minVersion>1.0</minVersion>
    <include>main</include>
    <detail><![CDATA[
=== Usage ===
This plugin allows splitting windows with C-x 0, C-x 1, C-x 2, C-x 3
    ]]></detail>
</KeySnailPlugin>;
// origin: https://gist.github.com/193286

key.setGlobalKey(['C-x', '5'], function (ev, arg) {
    alert('heey');
});

key.setGlobalKey(['C-x', '0'], function (ev, arg) {
    SplitBrowser.activeBrowserCloseWindow();
}, '現在のフレームを閉じる');

key.setGlobalKey(['C-x', '1'], function (ev, arg) {
    var url = SplitBrowser.activeBrowser != gBrowser ? SplitBrowser.activeSubBrowser.src : null;

    var browsers = SplitBrowser.browsers;
    for (var i = 0; i < browsers.length; ++i)
        browsers[i].close();

    if (url) window.loadURI(url);
}, '現在のフレームだけを表示');

key.setGlobalKey(['C-x', '2'], function (ev, arg) {
    SplitBrowser.addSubBrowser(window.content.location.href,
                               SplitBrowser.activeSubBrowser,
                               SplitBrowser.POSITION_BOTTOM);
}, 'フレームを横に分割');

key.setGlobalKey(['C-x', '3'], function (ev, arg) {
    SplitBrowser.addSubBrowser(window.content.location.href,
                               SplitBrowser.activeSubBrowser,
                               SplitBrowser.POSITION_RIGHT);
}, 'フレームを縦に分割');

key.setGlobalKey(['C-x', 'k'], function (ev, arg) {
    var b = SplitBrowser.activeBrowser;
    if (b.mTabs.length > 1) {
        b.removeTab(b.mCurrentTab);
    } else if (b === gBrowser) {
        gBrowser.removeTab(gBrowser.mCurrentTab);
    }
}, '現在のタブを閉じる');

key.setGlobalKey(['C-x', 'o'], function (ev, arg) {
    function focusSubBrowserById(aId) {
        SplitBrowser.getSubBrowserById(aId).browser.contentWindow.focus();
    }

    var browsers = SplitBrowser.browsers;

    if (SplitBrowser.activeBrowser === gBrowser) {
        focusSubBrowserById(browsers[(arg == null) ? 0 : browsers.length - 1].id);
        return;
    }

    var id = SplitBrowser.activeSubBrowser.id;

    for (var i = 0; i < browsers.length; i++) {
        if (browsers[i].id == id)
            break;
    }

    var nextIndex = (arg == null) ? i + 1 : i - 1;
    if (nextIndex >= browsers.length || nextIndex < 0)
        gBrowser.contentWindow.focus();
    else
        focusSubBrowserById(browsers[nextIndex].id);
}
, '次のフレームを選択', true);
