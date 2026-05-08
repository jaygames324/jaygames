// party.js — JayGames Social: Login, Friends, Groups, Parties, DMs
// Firebase REST: https://unblocked-games-chat-default-rtdb.firebaseio.com

(function () {
  'use strict';

  var DB = 'https://unblocked-games-chat-default-rtdb.firebaseio.com';
  var SESSION_KEY = 'jaygames_session';
  var EMOJIS = ['🦊','🐉','🤖','🐺','🦁','🐯','🐸','🦋','🐬','🦄','🐻','🐙','🦅','🐼','🦉'];

  // ── UTILS ──
  function hashPass(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) { h = Math.imul(31, h) + str.charCodeAt(i) | 0; }
    return 'h' + Math.abs(h).toString(36);
  }
  function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch(e) { return null; } }
  function saveSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }
  function loggedIn() { return !!getSession(); }
  function me() { return getSession() || {}; }
  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function gid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
  function ago(ts) {
    var s = Math.floor((Date.now()-ts)/1000);
    if (s < 60) return 'just now';
    if (s < 3600) return Math.floor(s/60)+'m ago';
    return Math.floor(s/3600)+'h ago';
  }
  function val(id) { var el=document.getElementById(id); return el ? el.value.trim() : ''; }
  function setBtn(id, txt) { var el=document.getElementById(id); if(el){el.textContent=txt;el.disabled=(txt==='');} }
  function setMsg(el, txt, col) { if(el){el.textContent=txt;el.style.color=col;} }
  function emptyMsg(icon, txt) {
    return '<div style="text-align:center;padding:36px 20px;color:rgba(180,190,255,0.3);font-size:13px;"><span style="font-size:32px;display:block;margin-bottom:8px;">'+icon+'</span>'+txt+'</div>';
  }
  function inputStyle() {
    return 'width:100%;background:rgba(255,107,53,0.06);border:1px solid rgba(255,255,255,0.11);border-radius:9px;padding:10px 14px;color:#eef0ff;font-size:13px;outline:none;font-family:inherit;box-sizing:border-box;';
  }
  function bigBtn(color) {
    return 'display:block;width:100%;background:linear-gradient(135deg,'+color+','+color+'cc);border:none;color:#fff;padding:10px;border-radius:9px;cursor:pointer;font-size:13px;font-weight:700;font-family:inherit;box-shadow:0 4px 14px rgba(0,0,0,0.25);';
  }
  function field(id, type, placeholder) {
    return '<input id="'+id+'" type="'+type+'" placeholder="'+esc(placeholder)+'" style="'+inputStyle()+'margin-bottom:12px;" />';
  }
  function sectionLabel(txt) {
    return '<div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(180,190,255,0.3);padding:10px 14px 4px;">'+txt+'</div>';
  }
  function verifiedBadge() {
    return '<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;color:#60a5fa;vertical-align:middle;margin-left:3px;">' +
      '<span style="display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;background:#3b82f6;border-radius:50%;font-size:7px;color:#fff;flex-shrink:0;">✓</span>' +
      'Verified</span>';
  }
  function renderMessages(msgs, myName) {
    if (!msgs.length) return '<div style="text-align:center;color:rgba(180,190,255,0.3);font-size:13px;padding:28px 0;margin:auto;">No messages yet — say hi! 👋</div>';
    return msgs.map(function(m){
      if (m.system) return '<div style="text-align:center;font-size:11px;color:rgba(180,190,255,0.3);padding:4px 0;">'+esc(m.text)+'</div>';
      var isMe = m.author === myName;
      return '<div style="margin-bottom:8px;">' +
        '<div style="display:flex;align-items:baseline;gap:5px;margin-bottom:2px;">' +
          '<span style="font-size:15px;line-height:1;">'+esc(m.emoji||'👤')+'</span>' +
          '<span style="font-size:12px;font-weight:700;color:'+(isMe?'#ff8c5a':'#eef0ff')+';">'+esc(m.author)+'</span>' +
          '<span style="font-size:10px;color:rgba(180,190,255,0.3);">'+ago(m.ts)+'</span>' +
        '</div>' +
        '<div style="font-size:13px;color:#eef0ff;line-height:1.5;padding-left:22px;word-break:break-word;">'+esc(m.text)+'</div>' +
      '</div>';
    }).join('');
  }

  // ── FIREBASE ──
  function fbUrl(p) { return DB + p + '.json'; }
  function fbGet(p, cb) { fetch(fbUrl(p)).then(function(r){return r.json();}).then(cb).catch(function(){cb(null);}); }
  function fbSet(p, d, cb) { fetch(fbUrl(p),{method:'PUT',body:JSON.stringify(d),headers:{'Content-Type':'application/json'}}).then(function(){if(cb)cb();}).catch(function(){if(cb)cb();}); }
  function fbPush(p, d, cb) { fetch(fbUrl(p),{method:'POST',body:JSON.stringify(d),headers:{'Content-Type':'application/json'}}).then(function(r){return r.json();}).then(function(res){if(cb)cb(res&&res.name);}).catch(function(){if(cb)cb(null);}); }
  function fbUpdate(p, d, cb) { fetch(fbUrl(p),{method:'PATCH',body:JSON.stringify(d),headers:{'Content-Type':'application/json'}}).then(function(){if(cb)cb();}).catch(function(){if(cb)cb();}); }
  function fbDelete(p, cb) { fetch(fbUrl(p),{method:'DELETE'}).then(function(){if(cb)cb();}).catch(function(){if(cb)cb();}); }

  // ── POLL ──
  var pollTimer = null;
  function startPoll(fn, ms) { stopPoll(); fn(); pollTimer = setInterval(fn, ms||3000); }
  function stopPoll() { if(pollTimer){clearInterval(pollTimer);pollTimer=null;} }

  // ── STATE ──
  var currentView = 'lobby';
  var currentPartyId = null;
  var currentGroupId = null;
  var currentDmId = null;
  var currentDmName = null;

  // ── BUTTON INJECT ──
  function injectButton() {
    if (document.getElementById('partyBtn')) return;
    var b = document.createElement('button');
    b.id = 'partyBtn';
    b.title = 'Party, Groups & Friends';
    b.style.cssText = 'position:relative;cursor:pointer;font-family:inherit;background:rgba(0,245,212,0.1);border:1px solid rgba(0,245,212,0.3);color:#00f5d4;border-radius:9px;padding:7px 13px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px;';
    b.innerHTML = '🎉 <span>Party</span>';
    b.onmousedown = function(e){e.stopPropagation();};
    b.onclick = function(e){e.stopPropagation();togglePanel();};
    var badge = document.createElement('span');
    badge.id = 'partyBadge';
    badge.style.cssText = 'display:none;position:absolute;top:-5px;right:-5px;background:#ef4444;color:#fff;font-size:9px;font-weight:800;min-width:16px;height:16px;border-radius:8px;align-items:center;justify-content:center;padding:0 3px;border:2px solid #08090d;pointer-events:none;';
    b.appendChild(badge);
    var nav = document.querySelector('nav');
    var navSearch = document.querySelector('.nav-search');
    if (nav && navSearch) nav.insertBefore(b, navSearch);
    else if (nav) nav.appendChild(b);
    setInterval(refreshBadge, 7000);
  }

  function refreshBadge() {
    if (!loggedIn()) return;
    var count = 0;
    fbGet('/friendRequests', function(data){
      if (data) Object.values(data).forEach(function(r){ if(r.toId===me().uid&&r.status==='pending') count++; });
      fbGet('/dms', function(dms){
        if (dms) Object.values(dms).forEach(function(conv){
          if (!conv||!conv.messages) return;
          Object.values(conv.messages).forEach(function(msg){ if(msg.to===me().uid&&!msg.read) count++; });
        });
        var badge = document.getElementById('partyBadge');
        if (!badge) return;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      });
    });
  }

  // ── PANEL ──
  function togglePanel() {
    var panel = document.getElementById('partyPanel');
    if (!panel) { buildPanel(); return; }
    if (panel.style.opacity === '1') hidePanel(); else openPanel();
  }
  function hidePanel() {
    stopPoll();
    var panel = document.getElementById('partyPanel');
    if (!panel) return;
    panel.style.opacity = '0'; panel.style.pointerEvents = 'none'; panel.style.transform = 'translateY(-10px) scale(0.97)';
  }
  function buildPanel() {
    if (document.getElementById('partyPanel')) { openPanel(); return; }
    var panel = document.createElement('div');
    panel.id = 'partyPanel';
    panel.style.cssText = [
      'position:fixed;top:72px;right:16px;width:380px;max-height:620px;',
      'background:#161a25;border:1px solid rgba(255,255,255,0.13);',
      'border-radius:18px;box-shadow:0 24px 64px rgba(0,0,0,0.85);z-index:9999;',
      'display:flex;flex-direction:column;overflow:hidden;',
      'opacity:0;pointer-events:none;',
      'transform:translateY(-10px) scale(0.97);',
      'transition:transform 0.22s cubic-bezier(0.34,1.2,0.64,1),opacity 0.18s;',
      "font-family:'Outfit',system-ui,sans-serif;",
    ].join('');
    panel.innerHTML =
      '<div id="pHeader" style="padding:12px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">' +
          '<span id="pTitle" style="font-size:15px;font-weight:800;color:#eef0ff;">🎉 JayGames Social</span>' +
          '<div style="display:flex;gap:6px;align-items:center;">' +
            '<span id="pUserChip" style="font-size:11px;color:rgba(180,190,255,0.55);"></span>' +
            '<button id="partyClose" style="background:none;border:none;color:rgba(180,190,255,0.55);cursor:pointer;font-size:20px;line-height:1;padding:0 4px;">✕</button>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex;gap:4px;" id="pTabs"></div>' +
      '</div>' +
      '<div id="partyBody" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;"></div>';
    document.body.appendChild(panel);
    panel.addEventListener('mousedown', function(e){e.stopPropagation();});
    panel.addEventListener('click', function(e){e.stopPropagation();});
    document.getElementById('partyClose').onclick = hidePanel;
    document.addEventListener('mousedown', function(e){
      var p=document.getElementById('partyPanel'), btn=document.getElementById('partyBtn');
      if (!p||p.style.opacity!=='1') return;
      if (!p.contains(e.target)&&btn&&!btn.contains(e.target)) hidePanel();
    });
    openPanel();
  }
  function openPanel() {
    var panel = document.getElementById('partyPanel');
    panel.style.opacity='1'; panel.style.pointerEvents='all'; panel.style.transform='translateY(0) scale(1)';
    if (!loggedIn()) showView('login');
    else showView(currentView||'lobby');
  }

  // ── TABS ──
  function buildTabs(active) {
    var tabs = document.getElementById('pTabs'); if (!tabs) return;
    var chip = document.getElementById('pUserChip');
    if (chip && loggedIn()) chip.textContent = me().emoji+' '+me().name;
    if (!loggedIn()) { tabs.innerHTML=''; return; }
    var list = [
      {v:'lobby',   l:'🎮 Parties'},
      {v:'groups',  l:'🎭 Groups'},
      {v:'friends', l:'👥 Friends'},
      {v:'dms',     l:'💬 DMs'},
      {v:'profile', l:'👤 Me'},
    ];
    tabs.innerHTML = list.map(function(t){
      var on = t.v===active || (active==='chat'&&t.v==='lobby') || (active==='groupChat'&&t.v==='groups') || (active==='dm'&&t.v==='dms');
      return '<button class="ptab" data-view="'+t.v+'" style="flex:1;padding:5px 2px;border-radius:8px;border:1px solid '+(on?'rgba(255,107,53,0.35)':'rgba(255,255,255,0.11)')+';background:'+(on?'rgba(255,107,53,0.15)':'none')+';color:'+(on?'#ff8c5a':'rgba(180,190,255,0.55)')+';font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;">'+t.l+'</button>';
    }).join('');
    tabs.querySelectorAll('.ptab').forEach(function(t){ t.onclick=function(){showView(t.dataset.view);}; });
  }

  // ── VIEWS ──
  function showView(view) {
    stopPoll(); currentView=view; buildTabs(view);
    var body=document.getElementById('partyBody'); if(!body) return;
    body.innerHTML='<div style="text-align:center;padding:32px;color:rgba(180,190,255,0.3);font-size:13px;">Loading...</div>';
    if      (view==='login')     renderLogin(body);
    else if (view==='register')  renderRegister(body);
    else if (view==='lobby')     renderLobby(body);
    else if (view==='groups')    renderGroupsLobby(body);
    else if (view==='friends')   renderFriends(body);
    else if (view==='dms')       renderDMs(body);
    else if (view==='profile')   renderProfile(body);
    else if (view==='chat')      renderPartyChat(body, currentPartyId);
    else if (view==='groupChat') renderGroupChat(body, currentGroupId);
    else if (view==='dm')        renderDM(body, currentDmId, currentDmName);
  }

  // ── LOGIN ──
  function renderLogin(body) {
    body.innerHTML =
      '<div style="padding:20px;">' +
        '<div style="text-align:center;margin-bottom:20px;">' +
          '<div style="font-size:40px;margin-bottom:8px;">🎮</div>' +
          '<div style="font-size:16px;font-weight:800;color:#eef0ff;">Welcome back!</div>' +
          '<div style="font-size:12px;color:rgba(180,190,255,0.55);margin-top:4px;">Log in to chat, join groups & parties</div>' +
        '</div>' +
        field('loginUser','text','Username') +
        field('loginPass','password','Password') +
        '<button id="loginBtn" style="'+bigBtn('#ff6b35')+'">Log In</button>' +
        '<div id="loginErr" style="font-size:12px;color:#ef4444;text-align:center;margin-top:8px;min-height:16px;"></div>' +
        '<div style="text-align:center;margin-top:14px;font-size:12px;color:rgba(180,190,255,0.55);">No account? <button id="goReg" style="background:none;border:none;color:#ff8c5a;cursor:pointer;font-size:12px;font-weight:700;font-family:inherit;">Create one</button></div>' +
      '</div>';
    document.getElementById('loginBtn').onclick = doLogin;
    document.getElementById('goReg').onclick = function(){showView('register');};
    document.getElementById('loginPass').onkeydown = function(e){if(e.key==='Enter')doLogin();};
  }

  function doLogin() {
    var uname=val('loginUser'), pass=val('loginPass');
    var err=document.getElementById('loginErr');
    if (!uname||!pass){err.textContent='Fill in both fields.';return;}
    setBtn('loginBtn','Logging in...');
    fbGet('/users', function(users){
      if (!users){err.textContent='No users found.';setBtn('loginBtn','Log In');return;}
      var found=Object.entries(users).find(function(e){return e[1].name===uname;});
      if (!found){err.textContent='Username not found.';setBtn('loginBtn','Log In');return;}
      var uid=found[0], user=found[1];
      if (user.passwordHash!==hashPass(pass)){err.textContent='Wrong password.';setBtn('loginBtn','Log In');return;}
      if (user.banned){err.textContent='🚫 This account has been banned.';setBtn('loginBtn','Log In');return;}
      saveSession({uid:uid,name:user.name,emoji:user.emoji,passwordHash:user.passwordHash});
      fbUpdate('/users/'+uid,{lastSeen:Date.now()});
      hookPageEvents(); syncLocalToAccount(uid); showView('lobby');
    });
  }

  // ── REGISTER ──
  function renderRegister(body) {
    body.innerHTML =
      '<div style="padding:20px;">' +
        '<div style="text-align:center;margin-bottom:16px;">' +
          '<div style="font-size:36px;margin-bottom:6px;">🎉</div>' +
          '<div style="font-size:16px;font-weight:800;color:#eef0ff;">Create Account</div>' +
          '<div style="font-size:12px;color:rgba(180,190,255,0.55);margin-top:4px;">Join the JayGames community</div>' +
        '</div>' +
        field('regUser','text','Username (3-20 chars)') +
        field('regPass','password','Password') +
        field('regPass2','password','Confirm password') +
        '<label style="font-size:12px;color:rgba(180,190,255,0.55);display:block;margin-bottom:8px;font-weight:700;">Pick your emoji</label>' +
        '<div id="emojiPicker" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px;">' +
          EMOJIS.map(function(e,i){ return '<button class="regEmoji" data-e="'+e+'" style="font-size:18px;padding:4px;background:'+(i===0?'rgba(255,107,53,0.2)':'rgba(255,255,255,0.04)')+';border:1px solid '+(i===0?'rgba(255,107,53,0.4)':'rgba(255,255,255,0.08)')+';border-radius:7px;cursor:pointer;line-height:1;">'+e+'</button>'; }).join('') +
        '</div>' +
        '<button id="regBtn" style="'+bigBtn('#ff6b35')+'">Create Account</button>' +
        '<div id="regErr" style="font-size:12px;color:#ef4444;text-align:center;margin-top:8px;min-height:16px;"></div>' +
        '<div style="text-align:center;margin-top:14px;font-size:12px;color:rgba(180,190,255,0.55);">Already have one? <button id="goLogin" style="background:none;border:none;color:#ff8c5a;cursor:pointer;font-size:12px;font-weight:700;font-family:inherit;">Log in</button></div>' +
      '</div>';
    var selEmoji=EMOJIS[0];
    body.querySelectorAll('.regEmoji').forEach(function(b){
      b.onclick=function(){
        body.querySelectorAll('.regEmoji').forEach(function(x){x.style.background='rgba(255,255,255,0.04)';x.style.borderColor='rgba(255,255,255,0.08)';});
        b.style.background='rgba(255,107,53,0.2)'; b.style.borderColor='rgba(255,107,53,0.4)'; selEmoji=b.dataset.e;
      };
    });
    document.getElementById('regBtn').onclick=function(){doRegister(function(){return selEmoji;});};
    document.getElementById('goLogin').onclick=function(){showView('login');};
    document.getElementById('regPass2').onkeydown=function(e){if(e.key==='Enter')doRegister(function(){return selEmoji;});};
  }

  function doRegister(getEmoji) {
    var uname=val('regUser').slice(0,20), pass=val('regPass'), pass2=val('regPass2');
    var err=document.getElementById('regErr');
    if (!uname||!pass){err.textContent='Fill in all fields.';return;}
    if (pass!==pass2){err.textContent='Passwords do not match.';return;}
    if (uname.length<3){err.textContent='Username must be at least 3 characters.';return;}
    if (pass.length<4){err.textContent='Password must be at least 4 characters.';return;}
    setBtn('regBtn','Creating...');
    fbGet('/users',function(users){
      var taken=users&&Object.values(users).some(function(u){return u.name===uname;});
      if (taken){err.textContent='That username is taken.';setBtn('regBtn','Create Account');return;}
      var uid=gid(), emoji=getEmoji(), hash=hashPass(pass);
      fbSet('/users/'+uid,{uid:uid,name:uname,emoji:emoji,passwordHash:hash,createdAt:Date.now(),lastSeen:Date.now()},function(){
        saveSession({uid:uid,name:uname,emoji:emoji,passwordHash:hash});
        hookPageEvents(); syncLocalToAccount(uid); showView('lobby');
      });
    });
  }

  // ── PARTIES LOBBY ──
  function renderLobby(body) {
    body.innerHTML =
      '<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0;">' +
        '<button id="showCreatePartyBtn" style="'+bigBtn('#ff6b35')+'">+ Create a Party</button>' +
      '</div>' +
      '<div id="lobbyList" style="flex:1;overflow-y:auto;"></div>';
    document.getElementById('showCreatePartyBtn').onclick=function(){showCreatePartyForm(body);};
    startPoll(loadLobby, 4000);
  }

  function loadLobby() {
    fbGet('/parties',function(data){
      var list=document.getElementById('lobbyList'); if(!list) return;
      if (!data){list.innerHTML=emptyMsg('🎮','No open parties yet.<br>Create one!');return;}
      var parties=Object.values(data).filter(function(p){return p&&p.active;}).reverse();
      if (!parties.length){list.innerHTML=emptyMsg('🎮','No open parties yet.<br>Create one!');return;}
      var session=me();
      list.innerHTML=parties.map(function(p){
        var members=p.members?Object.values(p.members):[];
        var mc=members.length;
        var isMember=members.some(function(m){return m.uid===session.uid;});
        var btn=isMember
          ?'<button data-pid="'+p.id+'" class="pOpenBtn" style="font-size:11px;font-weight:700;padding:5px 11px;border-radius:7px;background:rgba(0,245,212,0.12);border:1px solid rgba(0,245,212,0.28);color:#00f5d4;cursor:pointer;font-family:inherit;white-space:nowrap;">Open</button>'
          :'<button data-pid="'+p.id+'" class="pJoinBtn" style="font-size:11px;font-weight:700;padding:5px 11px;border-radius:7px;background:linear-gradient(135deg,#ff6b35,#e85a20);border:none;color:#fff;cursor:pointer;font-family:inherit;white-space:nowrap;">Join</button>';
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);">' +
          '<div style="width:36px;height:36px;border-radius:8px;background:rgba(255,107,53,0.12);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🎮</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-size:13px;font-weight:700;color:#eef0ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(p.name)+'</div>' +
            '<div style="font-size:11px;color:rgba(180,190,255,0.55);margin-top:1px;">by '+esc(p.host)+' · <span style="color:#00f5d4;font-weight:700;">'+mc+'</span> member'+(mc!==1?'s':'')+'</div>' +
          '</div>'+btn+'</div>';
      }).join('');
      list.querySelectorAll('.pJoinBtn').forEach(function(b){b.onclick=function(){doJoinParty(b.dataset.pid);};});
      list.querySelectorAll('.pOpenBtn').forEach(function(b){b.onclick=function(){openPartyChat(b.dataset.pid);};});
    });
  }

  function showCreatePartyForm(body) {
    stopPoll();
    body.innerHTML =
      '<div style="padding:16px;">' +
        '<div style="font-size:14px;font-weight:700;color:#eef0ff;margin-bottom:12px;">🎮 Create a Party</div>' +
        field('cfInput','text','Party name...') +
        '<div style="display:flex;gap:8px;">' +
          '<button id="cfCancel" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.11);color:rgba(180,190,255,0.55);padding:9px;border-radius:9px;cursor:pointer;font-size:13px;font-family:inherit;">Cancel</button>' +
          '<button id="cfSubmit" style="'+bigBtn('#ff6b35')+'flex:2;margin:0;">🎉 Create Party</button>' +
        '</div>' +
        '<div id="cfErr" style="font-size:12px;color:#ef4444;margin-top:8px;min-height:14px;"></div>' +
      '</div>';
    setTimeout(function(){var i=document.getElementById('cfInput');if(i)i.focus();},50);
    document.getElementById('cfCancel').onclick=function(){showView('lobby');};
    document.getElementById('cfSubmit').onclick=doCreateParty;
    document.getElementById('cfInput').onkeydown=function(e){if(e.key==='Enter')doCreateParty();};
  }

  function doCreateParty() {
    var name=val('cfInput');
    var err=document.getElementById('cfErr');
    if (!name){err.textContent='Enter a party name.';return;}
    setBtn('cfSubmit','Checking...');
    var session=me();
    fbGet('/parties',function(allParties){
      if (allParties) {
        var existing=Object.values(allParties).find(function(p){return p&&p.active&&p.hostUid===session.uid;});
        if (existing){var e=document.getElementById('cfErr');if(e)e.textContent='You already have an active party!';setBtn('cfSubmit','🎉 Create Party');return;}
      }
      setBtn('cfSubmit','Creating...');
      var partyId=gid();
      var party={id:partyId,name:name,host:session.name,hostUid:session.uid,active:true,createdAt:Date.now(),members:{},messages:{}};
      party.members[gid()]={uid:session.uid,name:session.name,emoji:session.emoji,joinedAt:Date.now()};
      fbSet('/parties/'+partyId,party,function(){
        fbPush('/parties/'+partyId+'/messages',{author:'System',emoji:'🎉',text:session.name+' created the party!',ts:Date.now(),system:true},function(){
          openPartyChat(partyId);
        });
      });
    });
  }

  function doJoinParty(partyId) {
    var session=me();
    fbGet('/parties/'+partyId+'/members',function(members){
      var already=members&&Object.values(members).some(function(m){return m.uid===session.uid;});
      if (already){openPartyChat(partyId);return;}
      fbSet('/parties/'+partyId+'/members/'+gid(),{uid:session.uid,name:session.name,emoji:session.emoji,joinedAt:Date.now()},function(){
        fbPush('/parties/'+partyId+'/messages',{author:'System',emoji:'👋',text:session.name+' joined!',ts:Date.now(),system:true},function(){
          openPartyChat(partyId);
        });
      });
    });
  }

  function openPartyChat(partyId) {
    stopPoll(); currentPartyId=partyId; currentView='chat';
    buildTabs('chat');
    var body=document.getElementById('partyBody'); if(body) renderPartyChat(body,partyId);
  }

  // ── PARTY CHAT ──
  function renderPartyChat(body, partyId) {
    var session=me();
    body.innerHTML=chatShell('🎮','Loading...','rgba(255,107,53,0.04)','#ff6b35');
    document.getElementById('chatBack').onclick=function(){stopPoll();currentPartyId=null;showView('lobby');};
    function sendMsg(){
      var inp=document.getElementById('chatInput'); if(!inp||!inp.value.trim()) return;
      var text=inp.value.trim(); inp.value='';
      fbPush('/parties/'+partyId+'/messages',{author:session.name,emoji:session.emoji,text:text,ts:Date.now()});
    }
    document.getElementById('chatSend').onclick=sendMsg;
    document.getElementById('chatInput').onkeydown=function(e){if(e.key==='Enter')sendMsg();};
    var lastCount=0, actBuilt=false;
    function poll(){
      fbGet('/parties/'+partyId,function(p){
        if (!p) return;
        var tEl=document.getElementById('chatTitle'); if(tEl) tEl.textContent=p.name;
        var members=p.members?Object.values(p.members):[];
        var mc=members.length;
        var sEl=document.getElementById('chatSubs');
        if(sEl) sEl.textContent=mc+' member'+(mc!==1?'s':'')+' · '+members.map(function(m){return m.emoji+' '+m.name;}).join(' · ');
        var aEl=document.getElementById('chatAct');
        if(aEl&&!actBuilt){
          actBuilt=true;
          if(p.hostUid===session.uid){
            aEl.innerHTML='<button id="disbandBtn" style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#ef4444;cursor:pointer;font-family:inherit;">Disband</button>';
            document.getElementById('disbandBtn').onclick=function(){if(!confirm('Disband party?'))return;fbUpdate('/parties/'+partyId,{active:false},function(){stopPoll();showView('lobby');});};
          } else {
            aEl.innerHTML='<button id="leaveBtn" style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.11);color:rgba(180,190,255,0.55);cursor:pointer;font-family:inherit;">Leave</button>';
            document.getElementById('leaveBtn').onclick=function(){
              fbGet('/parties/'+partyId+'/members',function(mems){
                var key=mems&&Object.entries(mems).find(function(e){return e[1].uid===session.uid;});
                if(key)fbDelete('/parties/'+partyId+'/members/'+key[0]);
                fbPush('/parties/'+partyId+'/messages',{author:'System',emoji:'👋',text:session.name+' left.',ts:Date.now(),system:true},function(){stopPoll();showView('lobby');});
              });
            };
          }
        }
        var msgs=p.messages?Object.values(p.messages).sort(function(a,b){return a.ts-b.ts;}):[]; 
        if(msgs.length===lastCount) return; lastCount=msgs.length;
        var el=document.getElementById('chatMsgs'); if(!el) return;
        var atBottom=el.scrollHeight-el.scrollTop<=el.clientHeight+60;
        el.innerHTML=renderMessages(msgs,session.name);
        if(atBottom) el.scrollTop=el.scrollHeight;
      });
    }
    startPoll(poll,2000);
  }

  // ── GROUPS LOBBY ──
  function renderGroupsLobby(body) {
    body.innerHTML =
      '<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0;">' +
        '<button id="showCreateGroupBtn" style="'+bigBtn('#a855f7')+'">+ Create a Group</button>' +
      '</div>' +
      '<div id="groupLobbyList" style="flex:1;overflow-y:auto;"></div>';
    document.getElementById('showCreateGroupBtn').onclick=function(){showCreateGroupForm(body);};
    startPoll(loadGroupsLobby, 5000);
  }

  function loadGroupsLobby() {
    fbGet('/groups',function(data){
      var list=document.getElementById('groupLobbyList'); if(!list) return;
      if (!data){list.innerHTML=emptyMsg('🎭','No groups yet.<br>Create one to get started!');return;}
      var groups=Object.values(data).filter(function(g){return g&&g.name;}).sort(function(a,b){return(b.createdAt||0)-(a.createdAt||0);});
      if (!groups.length){list.innerHTML=emptyMsg('🎭','No groups yet.<br>Create one to get started!');return;}
      var session=me();
      list.innerHTML=groups.map(function(g){
        var mc=g.members?Object.keys(g.members).length:0;
        var isMember=g.members&&Object.values(g.members).some(function(m){return m.uid===session.uid;});
        var btn=isMember
          ?'<button data-gid="'+g.id+'" class="gOpenBtn" style="font-size:11px;font-weight:700;padding:5px 11px;border-radius:7px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.35);color:#a855f7;cursor:pointer;font-family:inherit;white-space:nowrap;">Open</button>'
          :'<button data-gid="'+g.id+'" class="gJoinBtn" style="font-size:11px;font-weight:700;padding:5px 11px;border-radius:7px;background:linear-gradient(135deg,#a855f7,#7c3aed);border:none;color:#fff;cursor:pointer;font-family:inherit;white-space:nowrap;">Join</button>';
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);">' +
          '<div style="width:36px;height:36px;border-radius:8px;background:rgba(168,85,247,0.12);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🎭</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-size:13px;font-weight:700;color:#eef0ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(g.name)+(g.verified?verifiedBadge():'')+'</div>' +
            '<div style="font-size:11px;color:rgba(180,190,255,0.55);margin-top:1px;">by '+esc(g.host)+' · <span style="color:#a855f7;font-weight:700;">'+mc+'</span> member'+(mc!==1?'s':'')+'</div>' +
          '</div>'+btn+'</div>';
      }).join('');
      list.querySelectorAll('.gJoinBtn').forEach(function(b){b.onclick=function(){doJoinGroup(b.dataset.gid);};});
      list.querySelectorAll('.gOpenBtn').forEach(function(b){b.onclick=function(){openGroupChat(b.dataset.gid);};});
    });
  }

  function showCreateGroupForm(body) {
    stopPoll();
    body.innerHTML =
      '<div style="padding:16px;">' +
        '<div style="font-size:14px;font-weight:700;color:#eef0ff;margin-bottom:12px;">🎭 Create a Group</div>' +
        '<div style="font-size:12px;color:rgba(180,190,255,0.55);margin-bottom:6px;">Group Name</div>' +
        field('cgName','text','Group name...') +
        '<div style="font-size:12px;color:rgba(180,190,255,0.55);margin-bottom:6px;">Description (optional)</div>' +
        field('cgDesc','text','What\'s this group about?') +
        '<div style="display:flex;gap:8px;">' +
          '<button id="cgCancel" style="flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.11);color:rgba(180,190,255,0.55);padding:9px;border-radius:9px;cursor:pointer;font-size:13px;font-family:inherit;">Cancel</button>' +
          '<button id="cgSubmit" style="'+bigBtn('#a855f7')+'flex:2;margin:0;">🎭 Create Group</button>' +
        '</div>' +
        '<div id="cgErr" style="font-size:12px;color:#ef4444;margin-top:8px;min-height:14px;"></div>' +
      '</div>';
    setTimeout(function(){var i=document.getElementById('cgName');if(i)i.focus();},50);
    document.getElementById('cgCancel').onclick=function(){showView('groups');};
    document.getElementById('cgSubmit').onclick=doCreateGroup;
    document.getElementById('cgName').onkeydown=function(e){if(e.key==='Enter')doCreateGroup();};
  }

  function doCreateGroup() {
    var name=val('cgName'), desc=val('cgDesc');
    var err=document.getElementById('cgErr');
    if (!name){err.textContent='Enter a group name.';return;}
    setBtn('cgSubmit','Creating...');
    var session=me(), groupId=gid();
    var group={id:groupId,name:name,desc:desc,host:session.name,hostUid:session.uid,createdAt:Date.now(),verified:false,members:{},messages:{}};
    group.members[gid()]={uid:session.uid,name:session.name,emoji:session.emoji,joinedAt:Date.now(),role:'owner'};
    fbSet('/groups/'+groupId,group,function(){
      fbPush('/groups/'+groupId+'/messages',{author:'System',emoji:'🎭',text:session.name+' created the group!',ts:Date.now(),system:true},function(){
        openGroupChat(groupId);
      });
    });
  }

  function doJoinGroup(groupId) {
    var session=me();
    fbGet('/groups/'+groupId+'/members',function(members){
      var already=members&&Object.values(members).some(function(m){return m.uid===session.uid;});
      if (already){openGroupChat(groupId);return;}
      fbSet('/groups/'+groupId+'/members/'+gid(),{uid:session.uid,name:session.name,emoji:session.emoji,joinedAt:Date.now(),role:'member'},function(){
        fbPush('/groups/'+groupId+'/messages',{author:'System',emoji:'👋',text:session.name+' joined!',ts:Date.now(),system:true},function(){
          openGroupChat(groupId);
        });
      });
    });
  }

  function openGroupChat(groupId) {
    stopPoll(); currentGroupId=groupId; currentView='groupChat';
    buildTabs('groupChat');
    var body=document.getElementById('partyBody'); if(body) renderGroupChat(body,groupId);
  }

  // ── GROUP CHAT ──
  function renderGroupChat(body, groupId) {
    var session=me();
    body.innerHTML=chatShell('🎭','Loading...','rgba(168,85,247,0.04)','#a855f7');
    document.getElementById('chatBack').onclick=function(){stopPoll();currentGroupId=null;showView('groups');};
    function sendMsg(){
      var inp=document.getElementById('chatInput'); if(!inp||!inp.value.trim()) return;
      var text=inp.value.trim(); inp.value='';
      fbPush('/groups/'+groupId+'/messages',{author:session.name,emoji:session.emoji,text:text,ts:Date.now()});
    }
    document.getElementById('chatSend').onclick=sendMsg;
    document.getElementById('chatInput').onkeydown=function(e){if(e.key==='Enter')sendMsg();};
    document.getElementById('chatSend').style.background='linear-gradient(135deg,#a855f7,#7c3aed)';
    var lastCount=0, actBuilt=false;
    function poll(){
      fbGet('/groups/'+groupId,function(g){
        if (!g) return;
        var tEl=document.getElementById('chatTitle');
        if(tEl) tEl.innerHTML=esc(g.name)+(g.verified?verifiedBadge():'');
        var members=g.members?Object.values(g.members):[];
        var mc=members.length;
        var sEl=document.getElementById('chatSubs');
        if(sEl) sEl.textContent=mc+' member'+(mc!==1?'s':'')+' · '+members.map(function(m){return m.emoji+' '+m.name;}).join(' · ');
        var aEl=document.getElementById('chatAct');
        if(aEl&&!actBuilt){
          actBuilt=true;
          if(g.hostUid===session.uid){
            aEl.innerHTML='<button id="gdelBtn" style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#ef4444;cursor:pointer;font-family:inherit;">Delete</button>';
            document.getElementById('gdelBtn').onclick=function(){if(!confirm('Delete this group?'))return;fbDelete('/groups/'+groupId,function(){stopPoll();showView('groups');});};
          } else {
            aEl.innerHTML='<button id="gleaveBtn" style="font-size:10px;padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.11);color:rgba(180,190,255,0.55);cursor:pointer;font-family:inherit;">Leave</button>';
            document.getElementById('gleaveBtn').onclick=function(){
              fbGet('/groups/'+groupId+'/members',function(mems){
                var key=mems&&Object.entries(mems).find(function(e){return e[1].uid===session.uid;});
                if(key)fbDelete('/groups/'+groupId+'/members/'+key[0]);
                fbPush('/groups/'+groupId+'/messages',{author:'System',emoji:'👋',text:session.name+' left.',ts:Date.now(),system:true},function(){stopPoll();showView('groups');});
              });
            };
          }
        }
        var msgs=g.messages?Object.values(g.messages).sort(function(a,b){return a.ts-b.ts;}):[]; 
        if(msgs.length===lastCount) return; lastCount=msgs.length;
        var el=document.getElementById('chatMsgs'); if(!el) return;
        var atBottom=el.scrollHeight-el.scrollTop<=el.clientHeight+60;
        el.innerHTML=renderMessages(msgs,session.name);
        if(atBottom) el.scrollTop=el.scrollHeight;
      });
    }
    startPoll(poll,2000);
  }

  // ── CHAT SHELL (shared HTML structure) ──
  function chatShell(icon, title, headerBg, accentColor) {
    return '<div style="flex-shrink:0;background:'+headerBg+';border-bottom:1px solid rgba(255,255,255,0.07);">' +
        '<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;">' +
          '<button id="chatBack" style="background:none;border:none;color:rgba(180,190,255,0.55);cursor:pointer;font-size:13px;padding:0;font-family:inherit;flex-shrink:0;">← Back</button>' +
          '<div style="flex:1;min-width:0;">' +
            '<div id="chatTitle" style="font-size:13px;font-weight:700;color:#eef0ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+title+'</div>' +
            '<div id="chatSubs" style="font-size:11px;color:rgba(180,190,255,0.55);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></div>' +
          '</div>' +
          '<div id="chatAct"></div>' +
        '</div>' +
      '</div>' +
      '<div id="chatMsgs" style="flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;min-height:200px;"></div>' +
      '<div style="display:flex;gap:8px;padding:10px 14px;border-top:1px solid rgba(255,255,255,0.07);flex-shrink:0;">' +
        '<input id="chatInput" type="text" maxlength="200" placeholder="Say something..." style="'+inputStyle()+'" />' +
        '<button id="chatSend" style="flex-shrink:0;background:linear-gradient(135deg,'+accentColor+','+accentColor+'cc);border:none;color:#fff;width:36px;height:36px;border-radius:9px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">➤</button>' +
      '</div>';
  }

  // ── FRIENDS (with my groups + my parties sections) ──
  function renderFriends(body) {
    body.innerHTML =
      '<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0;">' +
        '<div style="font-size:12px;color:rgba(180,190,255,0.55);margin-bottom:6px;font-weight:700;">Add friend by username</div>' +
        '<div style="display:flex;gap:8px;">' +
          '<input id="addFInput" type="text" maxlength="20" placeholder="Their exact username..." style="'+inputStyle()+'" />' +
          '<button id="addFBtn" style="flex-shrink:0;background:linear-gradient(135deg,#ff6b35,#e85a20);border:none;color:#fff;width:36px;height:36px;border-radius:9px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">🔍</button>' +
        '</div>' +
        '<div id="addFMsg" style="font-size:12px;margin-top:6px;min-height:14px;"></div>' +
      '</div>' +
      '<div id="friendsContent" style="flex:1;overflow-y:auto;"></div>';
    document.getElementById('addFBtn').onclick=doAddFriend;
    document.getElementById('addFInput').onkeydown=function(e){if(e.key==='Enter')doAddFriend();};
    startPoll(loadFriends,5000);
  }

  function loadFriends() {
    var content=document.getElementById('friendsContent'); if(!content) return;
    var session=me();
    // Load friend requests, friends, my groups, my parties in parallel
    fbGet('/friendRequests',function(reqData){
      fbGet('/users/'+session.uid+'/friends',function(friendData){
        fbGet('/groups',function(allGroups){
          fbGet('/parties',function(allParties){
            var html='';

            // ── Friend Requests ──
            var pending=[];
            if(reqData) Object.entries(reqData).forEach(function(e){var r=e[1];if(r.toId===session.uid&&r.status==='pending')pending.push([e[0],r]);});
            if(pending.length){
              html+=sectionLabel('📨 Friend Requests');
              pending.forEach(function(entry){
                var rid=entry[0],r=entry[1];
                html+='<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);background:rgba(255,107,53,0.04);">'+
                  '<span style="font-size:24px;flex-shrink:0;">'+esc(r.fromEmoji||'👤')+'</span>'+
                  '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;color:#eef0ff;">'+esc(r.fromName)+'</div><div style="font-size:11px;color:rgba(180,190,255,0.55);">wants to be friends</div></div>'+
                  '<button data-rid="'+rid+'" data-fid="'+r.fromId+'" data-fn="'+esc(r.fromName)+'" data-fe="'+esc(r.fromEmoji||'👤')+'" class="acceptBtn" style="font-size:11px;font-weight:700;padding:4px 9px;border-radius:7px;background:rgba(0,245,212,0.12);border:1px solid rgba(0,245,212,0.28);color:#00f5d4;cursor:pointer;font-family:inherit;margin-right:4px;">✓</button>'+
                  '<button data-rid="'+rid+'" class="denyBtn" style="font-size:11px;font-weight:700;padding:4px 9px;border-radius:7px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#ef4444;cursor:pointer;font-family:inherit;">✕</button>'+
                '</div>';
              });
            }

            // ── Friends ──
            var friendIds=friendData?Object.keys(friendData):[];
            if(friendIds.length){
              html+=sectionLabel('👥 Friends');
              friendIds.forEach(function(fid){
                var f=friendData[fid];
                html+='<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);">'+
                  '<span style="font-size:24px;flex-shrink:0;">'+esc(f.emoji||'👤')+'</span>'+
                  '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;color:#eef0ff;">'+esc(f.name)+'</div></div>'+
                  '<button data-fid="'+fid+'" data-fn="'+esc(f.name)+'" class="dmBtn" style="font-size:11px;font-weight:700;padding:4px 9px;border-radius:7px;background:rgba(255,107,53,0.12);border:1px solid rgba(255,107,53,0.3);color:#ff8c5a;cursor:pointer;font-family:inherit;margin-right:4px;">💬 DM</button>'+
                  '<button data-fid="'+fid+'" class="removeBtn" style="font-size:11px;padding:4px 9px;border-radius:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.11);color:rgba(180,190,255,0.3);cursor:pointer;font-family:inherit;">Remove</button>'+
                '</div>';
              });
            }

            // ── My Groups ──
            var myGroups=allGroups?Object.values(allGroups).filter(function(g){return g&&g.members&&Object.values(g.members).some(function(m){return m.uid===session.uid;});}):[];
            if(myGroups.length){
              html+=sectionLabel('🎭 My Groups');
              myGroups.forEach(function(g){
                var mc=g.members?Object.keys(g.members).length:0;
                html+='<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);cursor:pointer;" class="myGroupRow" data-gid="'+g.id+'">'+
                  '<div style="width:34px;height:34px;border-radius:8px;background:rgba(168,85,247,0.12);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🎭</div>'+
                  '<div style="flex:1;min-width:0;">'+
                    '<div style="font-size:13px;font-weight:700;color:#eef0ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(g.name)+(g.verified?verifiedBadge():'')+'</div>'+
                    '<div style="font-size:11px;color:rgba(180,190,255,0.55);margin-top:1px;"><span style="color:#a855f7;font-weight:700;">'+mc+'</span> member'+(mc!==1?'s':'')+'</div>'+
                  '</div>'+
                  '<span style="font-size:18px;color:#a855f7;">›</span>'+
                '</div>';
              });
            }

            // ── My Parties ──
            var myParties=allParties?Object.values(allParties).filter(function(p){return p&&p.active&&p.members&&Object.values(p.members).some(function(m){return m.uid===session.uid;});}):[];
            if(myParties.length){
              html+=sectionLabel('🎮 My Parties');
              myParties.forEach(function(p){
                var mc=p.members?Object.keys(p.members).length:0;
                html+='<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);cursor:pointer;" class="myPartyRow" data-pid="'+p.id+'">'+
                  '<div style="width:34px;height:34px;border-radius:8px;background:rgba(255,107,53,0.12);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🎮</div>'+
                  '<div style="flex:1;min-width:0;">'+
                    '<div style="font-size:13px;font-weight:700;color:#eef0ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(p.name)+'</div>'+
                    '<div style="font-size:11px;color:rgba(180,190,255,0.55);margin-top:1px;">by '+esc(p.host)+' · <span style="color:#00f5d4;font-weight:700;">'+mc+'</span> member'+(mc!==1?'s':'')+'</div>'+
                  '</div>'+
                  '<span style="font-size:18px;color:#ff8c5a;">›</span>'+
                '</div>';
              });
            }

            if(!pending.length&&!friendIds.length&&!myGroups.length&&!myParties.length){
              html=emptyMsg('👥','No friends, groups, or parties yet.<br>Add friends or join a group!');
            }

            content.innerHTML=html;
            content.querySelectorAll('.acceptBtn').forEach(function(b){b.onclick=function(){doAccept(b.dataset.rid,b.dataset.fid,b.dataset.fn,b.dataset.fe);};});
            content.querySelectorAll('.denyBtn').forEach(function(b){b.onclick=function(){doDeny(b.dataset.rid);};});
            content.querySelectorAll('.removeBtn').forEach(function(b){b.onclick=function(){doRemove(b.dataset.fid);};});
            content.querySelectorAll('.dmBtn').forEach(function(b){b.onclick=function(){openDM(b.dataset.fid,b.dataset.fn);};});
            content.querySelectorAll('.myGroupRow').forEach(function(row){
              row.onmouseenter=function(){row.style.background='rgba(168,85,247,0.06)';};
              row.onmouseleave=function(){row.style.background='';};
              row.onclick=function(){openGroupChat(row.dataset.gid);};
            });
            content.querySelectorAll('.myPartyRow').forEach(function(row){
              row.onmouseenter=function(){row.style.background='rgba(255,107,53,0.06)';};
              row.onmouseleave=function(){row.style.background='';};
              row.onclick=function(){openPartyChat(row.dataset.pid);};
            });
          });
        });
      });
    });
  }

  function doAddFriend() {
    var input=document.getElementById('addFInput'), msgEl=document.getElementById('addFMsg');
    var targetName=(input?input.value:'').trim(); if(!targetName) return;
    var session=me();
    if(targetName===session.name){setMsg(msgEl,"You can't add yourself!",'#ef4444');return;}
    setMsg(msgEl,'Searching...','rgba(180,190,255,0.55)');
    fbGet('/users',function(users){
      if(!users){setMsg(msgEl,'User not found.','#ef4444');return;}
      var found=Object.entries(users).find(function(e){return e[1].name===targetName;});
      if(!found){setMsg(msgEl,'No user found with that username.','#ef4444');return;}
      var targetId=found[0];
      fbGet('/users/'+session.uid+'/friends/'+targetId,function(ex){
        if(ex){setMsg(msgEl,"You're already friends!",'#ef4444');return;}
        fbPush('/friendRequests',{fromId:session.uid,fromName:session.name,fromEmoji:session.emoji,toId:targetId,toName:found[1].name,status:'pending',ts:Date.now()},function(){
          setMsg(msgEl,'✓ Request sent to '+targetName+'!','#00f5d4');
          if(input) input.value='';
        });
      });
    });
  }

  function doAccept(rid,fromId,fromName,fromEmoji){
    var session=me();
    fbSet('/users/'+session.uid+'/friends/'+fromId,{name:fromName,emoji:fromEmoji,since:Date.now()});
    fbSet('/users/'+fromId+'/friends/'+session.uid,{name:session.name,emoji:session.emoji,since:Date.now()});
    fbUpdate('/friendRequests/'+rid,{status:'accepted'});
  }
  function doDeny(rid){fbUpdate('/friendRequests/'+rid,{status:'denied'});}
  function doRemove(fid){
    if(!confirm('Remove this friend?'))return;
    var session=me();fbDelete('/users/'+session.uid+'/friends/'+fid);fbDelete('/users/'+fid+'/friends/'+session.uid);
  }

  // ── DMs ──
  function dmConvId(a,b){return [a,b].sort().join('_');}

  function openDM(friendUid, friendName) {
    stopPoll(); currentDmId=friendUid; currentDmName=friendName; currentView='dm';
    buildTabs('dm');
    var body=document.getElementById('partyBody'); if(body) renderDM(body,friendUid,friendName);
  }

  function renderDMs(body) {
    var session=me();
    body.innerHTML='<div id="dmList" style="flex:1;overflow-y:auto;"></div>';
    function loadDMs(){
      fbGet('/users/'+session.uid+'/friends',function(friends){
        var list=document.getElementById('dmList'); if(!list) return;
        if(!friends||!Object.keys(friends).length){list.innerHTML=emptyMsg('💬','No friends to message yet.<br>Add some in Friends tab!');return;}
        var html=sectionLabel('💬 Direct Messages');
        Object.entries(friends).forEach(function(entry){
          var fid=entry[0],f=entry[1];
          html+='<div data-fid="'+fid+'" data-fn="'+esc(f.name)+'" class="dmRow" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.07);cursor:pointer;transition:background 0.12s;">'+
            '<span style="font-size:26px;flex-shrink:0;">'+esc(f.emoji||'👤')+'</span>'+
            '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:700;color:#eef0ff;">'+esc(f.name)+'</div><div style="font-size:11px;color:rgba(180,190,255,0.55);">Tap to chat</div></div>'+
            '<span style="font-size:18px;color:#ff8c5a;">›</span>'+
          '</div>';
        });
        list.innerHTML=html;
        list.querySelectorAll('.dmRow').forEach(function(row){
          row.onmouseenter=function(){row.style.background='rgba(255,107,53,0.06)';};
          row.onmouseleave=function(){row.style.background='';};
          row.onclick=function(){openDM(row.dataset.fid,row.dataset.fn);};
        });
      });
    }
    startPoll(loadDMs,6000);
  }

  function renderDM(body, friendUid, friendName) {
    var session=me(), convId=dmConvId(session.uid,friendUid);
    fbGet('/users/'+friendUid,function(u){
      var fName=u?u.name:friendName, fEmoji=u?u.emoji:'👤';
      body.innerHTML=
        '<div style="flex-shrink:0;background:rgba(255,107,53,0.04);border-bottom:1px solid rgba(255,255,255,0.07);">'+
          '<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;">'+
            '<button id="dmBack" style="background:none;border:none;color:rgba(180,190,255,0.55);cursor:pointer;font-size:13px;padding:0;font-family:inherit;flex-shrink:0;">← Back</button>'+
            '<span style="font-size:22px;">'+esc(fEmoji)+'</span>'+
            '<div style="font-size:14px;font-weight:700;color:#eef0ff;">'+esc(fName)+'</div>'+
          '</div>'+
        '</div>'+
        '<div id="dmMsgs" style="flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;min-height:200px;"></div>'+
        '<div style="display:flex;gap:8px;padding:10px 14px;border-top:1px solid rgba(255,255,255,0.07);flex-shrink:0;">'+
          '<input id="dmInput" type="text" maxlength="500" placeholder="Message '+esc(fName)+'..." style="'+inputStyle()+'" />'+
          '<button id="dmSend" style="flex-shrink:0;background:linear-gradient(135deg,#ff6b35,#e85a20);border:none;color:#fff;width:36px;height:36px;border-radius:9px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">➤</button>'+
        '</div>';
      document.getElementById('dmBack').onclick=function(){stopPoll();currentDmId=null;currentDmName=null;showView('dms');};
      function sendDM(){
        var inp=document.getElementById('dmInput'); if(!inp||!inp.value.trim()) return;
        var text=inp.value.trim(); inp.value='';
        fbPush('/dms/'+convId+'/messages',{from:session.uid,fromName:session.name,fromEmoji:session.emoji,to:friendUid,text:text,ts:Date.now(),read:false});
      }
      document.getElementById('dmSend').onclick=sendDM;
      document.getElementById('dmInput').onkeydown=function(e){if(e.key==='Enter')sendDM();};
      var lastCount=0;
      function poll(){
        fbGet('/dms/'+convId+'/messages',function(data){
          var el=document.getElementById('dmMsgs'); if(!el) return;
          if(!data){el.innerHTML='<div style="text-align:center;color:rgba(180,190,255,0.3);font-size:13px;padding:28px 0;margin:auto;">No messages yet — say hi! 👋</div>';return;}
          var msgs=Object.values(data).sort(function(a,b){return a.ts-b.ts;});
          if(msgs.length===lastCount) return; lastCount=msgs.length;
          Object.entries(data).forEach(function(e){if(e[1].to===session.uid&&!e[1].read)fbUpdate('/dms/'+convId+'/messages/'+e[0],{read:true});});
          var atBottom=el.scrollHeight-el.scrollTop<=el.clientHeight+60;
          el.innerHTML=msgs.map(function(m){
            var isMe=m.from===session.uid;
            return '<div style="margin-bottom:10px;display:flex;flex-direction:column;align-items:'+(isMe?'flex-end':'flex-start')+';"><div style="font-size:11px;color:rgba(180,190,255,0.3);margin-bottom:3px;">'+(isMe?'You':esc(m.fromName))+' · '+ago(m.ts)+'</div><div style="font-size:13px;padding:8px 12px;border-radius:12px;max-width:80%;word-break:break-word;background:'+(isMe?'linear-gradient(135deg,#ff6b35,#e85a20)':'rgba(255,255,255,0.08)')+';color:#eef0ff;">'+esc(m.text)+'</div></div>';
          }).join('');
          if(atBottom) el.scrollTop=el.scrollHeight;
        });
      }
      startPoll(poll,2000);
    });
  }

  // ── PROFILE ──
  function renderProfile(body) {
    var session=me();
    body.innerHTML=
      '<div style="padding:16px;">'+
        '<div style="text-align:center;padding:16px;background:rgba(255,107,53,0.05);border-radius:12px;margin-bottom:16px;">'+
          '<div style="font-size:52px;margin-bottom:6px;line-height:1;">'+esc(session.emoji)+'</div>'+
          '<div style="font-size:16px;font-weight:800;color:#eef0ff;">'+esc(session.name)+'</div>'+
          '<div style="font-size:11px;color:rgba(180,190,255,0.55);margin-top:4px;background:rgba(255,107,53,0.1);display:inline-block;padding:2px 10px;border-radius:20px;">@'+esc(session.name)+'</div>'+
        '</div>'+
        '<label style="font-size:12px;color:rgba(180,190,255,0.55);display:block;margin-bottom:8px;font-weight:700;">Change emoji</label>'+
        '<div id="profileEmojis" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:16px;">'+
          EMOJIS.map(function(e){return '<button class="profEmoji" data-e="'+e+'" style="font-size:18px;padding:4px;background:'+(e===session.emoji?'rgba(255,107,53,0.2)':'rgba(255,255,255,0.04)')+';border:1px solid '+(e===session.emoji?'rgba(255,107,53,0.4)':'rgba(255,255,255,0.08)')+';border-radius:7px;cursor:pointer;line-height:1;">'+e+'</button>';}).join('')+
        '</div>'+
        '<button id="saveEmojiBtn" style="'+bigBtn('#ff6b35')+'margin-bottom:10px;">Save Changes</button>'+
        '<div id="profMsg" style="font-size:12px;text-align:center;min-height:14px;"></div>'+
        '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:16px 0;" />'+
        '<button id="logoutBtn" style="width:100%;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#ef4444;padding:10px;border-radius:9px;cursor:pointer;font-size:13px;font-weight:700;font-family:inherit;">Log Out</button>'+
      '</div>';
    var selEmoji=session.emoji;
    body.querySelectorAll('.profEmoji').forEach(function(b){
      b.onclick=function(){
        body.querySelectorAll('.profEmoji').forEach(function(x){x.style.background='rgba(255,255,255,0.04)';x.style.borderColor='rgba(255,255,255,0.08)';});
        b.style.background='rgba(255,107,53,0.2)';b.style.borderColor='rgba(255,107,53,0.4)';selEmoji=b.dataset.e;
      };
    });
    document.getElementById('saveEmojiBtn').onclick=function(){
      var s=me();s.emoji=selEmoji;saveSession(s);fbUpdate('/users/'+s.uid,{emoji:selEmoji});
      setMsg(document.getElementById('profMsg'),'✓ Saved!','#00f5d4');
    };
    document.getElementById('logoutBtn').onclick=function(){
      if(!confirm('Log out?'))return;clearSession();stopPoll();showView('login');
    };
  }

  // ── CLOUD SYNC ──
  function lsGet(k,fallback){try{var v=localStorage.getItem(k);return v?JSON.parse(v):fallback;}catch(e){return fallback;}}
  function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function pushAllToCloud(uid){
    if(!uid) return;
    fbUpdate('/userData/'+uid,{favs:lsGet('favs',[]),ratings:lsGet('ratings',{}),achievements:lsGet('achievements',[]),recentGames:lsGet('recent2',[]).slice(0,50),playTimes:lsGet('playTimes',{}),savedAt:Date.now()});
  }
  function pullFromCloud(uid,cb){
    fbGet('/userData/'+uid,function(data){
      if(!data){if(cb)cb();return;}
      if(data.favs&&Array.isArray(data.favs))lsSet('favs',Array.from(new Set(lsGet('favs',[]).concat(data.favs))));
      if(data.ratings)lsSet('ratings',Object.assign({},data.ratings,lsGet('ratings',{})));
      if(data.achievements&&Array.isArray(data.achievements))lsSet('achievements',Array.from(new Set(lsGet('achievements',[]).concat(data.achievements))));
      if(cb)cb();
    });
  }
  function syncLocalToAccount(uid){pushAllToCloud(uid);pullFromCloud(uid,function(){pushAllToCloud(uid);});}
  function hookPageEvents(){
    var session=me();if(!session||!session.uid)return;
    var uid=session.uid, origSetItem=localStorage.setItem.bind(localStorage), timers={};
    localStorage.setItem=function(k,v){
      origSetItem(k,v);
      var keys={'favs':'favs','ratings':'ratings','achievements':'achievements','recent2':'recentGames','playTimes':'playTimes'};
      if(!keys[k])return;
      if(timers[k])clearTimeout(timers[k]);
      timers[k]=setTimeout(function(){try{var p=JSON.parse(v),pl={};pl[keys[k]]=p;pl.savedAt=Date.now();fbUpdate('/userData/'+uid,pl);}catch(e){}},2000);
    };
    window.addEventListener('beforeunload',function(){pushAllToCloud(uid);});
    document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')pushAllToCloud(uid);});
    setInterval(function(){pushAllToCloud(uid);},60000);
  }

  // ── INIT ──
  function init() {
    injectButton();
    if (loggedIn()) { hookPageEvents(); syncLocalToAccount(me().uid); }
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();

})();
