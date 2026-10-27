__d(function(g,r,i,a,m,e,d){'use strict';m.exports=r(d[0])},793,[1311]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(t,n){return Object.keys(t).forEach(function(c){"default"===c||Object.prototype.hasOwnProperty.call(n,c)||Object.defineProperty(n,c,{enumerable:!0,get:function(){return t[c]}})}),t}Object.defineProperty(e,"__esModule",{value:!0}),r(d[0]),t(r(d[1]),e),t(r(d[2]),e),t(r(d[3]),e),t(r(d[4]),e)},794,[1290,1291,1301,1302,1304]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"useAsyncStorage",{enumerable:!0,get:function(){return n.useAsyncStorage}}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return o}});var e,t=r(d[0]),u=(e=t)&&e.__esModule?e:{default:e},n=r(d[1]),o=u.default},795,[1312,1316]);
__d(function(g,r,i,a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"db",{enumerable:!0,get:function(){return u}}),Object.defineProperty(_e,"auth",{enumerable:!0,get:function(){return f}}),Object.defineProperty(_e,"ensureSignedIn",{enumerable:!0,get:function(){return c}}),r(_d[0]);var e=r(_d[1]),t=r(_d[2]),n=(function(e){if(e&&e.__esModule)return e;var t={};return e&&Object.keys(e).forEach(function(n){if('default'!==n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,t})(r(_d[3]));r(_d[4]);const o=(0,e.initializeApp)({apiKey:"AIzaSyCkj6gYcGJmZrDELoFV8o7OW3_5YSmY2z0",authDomain:"golf-tournament-app-e2390.firebaseapp.com",projectId:"golf-tournament-app-e2390",storageBucket:"golf-tournament-app-e2390.firebasestorage.app",messagingSenderId:"547661928460",appId:"1:547661928460:web:a12aff831aa35ea324f629"}),u=(0,t.getFirestore)(o),f=n.getAuth(o);function c(){return new Promise((e,t)=>{const o=n.onAuthStateChanged(f,u=>{o(),u?e(u):n.signInAnonymously(f).then(t=>e(t.user),t)})})}},796,[104,1317,797,1274,795]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},797,[1325]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.SessionProvider=function({children:n}){const[s,y]=(0,t.useState)(null),[f,v]=(0,t.useState)(!1);(0,t.useEffect)(()=>{(async()=>{try{const t=await(0,o.loadIdentity)();t&&await l(t)?y(t):t&&await(0,o.clearIdentity)()}catch(t){console.error('Error restoring session:',t)}finally{v(!0)}})()},[]);const I=(0,t.useCallback)(async t=>{await(0,o.saveIdentity)(t),y(t)},[]),w=(0,t.useCallback)(async(t,n)=>{y(s=>{if(!s)return s;const c={...s,roundId:t,groupId:n};return(0,o.saveIdentity)(c),c})},[]),b=(0,t.useCallback)(async()=>{await(0,o.clearIdentity)(),y(null)},[]),C=(0,t.useMemo)(()=>({session:s,ready:f,signIn:I,selectMatch:w,signOut:b}),[s,f,I,w,b]);return(0,c.jsx)(u.Provider,{value:C,children:n})},e.useSession=function(){const n=(0,t.useContext)(u);if(!n)throw new Error("useSession must be used inside SessionProvider");return n};var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),c=r(d[4]);const u=(0,t.createContext)(null);async function l(t){const o=await(0,n.getDoc)((0,n.doc)(s.db,'invitationCodes',t.invitationCode));if(!o.exists()||!0!==o.data().active)return!1;const c=await(0,n.getDoc)((0,n.doc)(s.db,'tournaments',t.tournamentId));return(c.data()?.claimedPlayers||[]).some(n=>n.playerId===t.playerId&&n.claimedBy===s.auth.currentUser?.uid)}},798,[12,797,796,1330,6]);
__d(function(g,r,i,a,m,e,d){"use strict";function n(n,t,o){const s=[n,t].filter(Boolean).join('\n\n'),f=o&&o.length?o:[{text:'OK'}],l=f.find(n=>'cancel'===n.style),c=f.filter(n=>n!==l);if(!l&&c.length<=1)return window.alert(s),void c[0]?.onPress?.();if(1!==c.length){for(const n of c)if(window.confirm(`${s}\n\nOK: ${n.text}`))return void n.onPress?.();l?.onPress?.()}else window.confirm(s)?c[0].onPress?.():l?.onPress?.()}Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"Alert",{enumerable:!0,get:function(){return t}}),r(d[0]),r(d[1]);const t={alert:(t,o,s,f)=>n(t,o,s)}},799,[101,104]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getHandicapStrokes=function(n,c){if(!n||!c)return 0;const t=Math.round(n);if(t<0)return c>18+t?-1:0;if(c<=t)return c<=t-18?2:1;return 0},e.calculateNetScore=function(n,c){if(!n||0===n)return 0;return n-c},e.getHoleHandicapForPlayer=function(n,c,t=null){if(!n)return 18;if('F'===c&&n.womenHandicap)return n.womenHandicap;if('M'===c&&n.menHandicap)return n.menHandicap;return n.handicap||n.menHandicap||n.womenHandicap||18},e.getStrokeIndicator=function(n){return 2===n?'\u25cf\u25cf':1===n?'\u25cf':''},e.calculatePlayingHandicaps=function(c,t,u=100){const o={};if(!c||0===c.length)return o;if('full'===t)c.forEach(c=>{const t=c.courseHandicap||0;o[c.name]=(0,n.calculatePlayingHandicap)(t,u)});else if('offLow'===t){const t=c.map(n=>n.courseHandicap||0),l=Math.min(...t);c.forEach(c=>{const t=(c.courseHandicap||0)-l;o[c.name]=(0,n.calculatePlayingHandicap)(t,u)})}else c.forEach(c=>{const t=c.courseHandicap||0;o[c.name]=(0,n.calculatePlayingHandicap)(t,u)});return o};var n=r(d[0])},800,[1331]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.newId=function(){return(0,t.doc)((0,t.collection)(n.db,'_ids')).id},e.getTournament=a,e.saveTournament=async function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.TOURNAMENTS,a);await(0,t.setDoc)(c,{...s,id:a,updatedAt:(0,t.serverTimestamp)()},{merge:!0})},e.listenToTournament=function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.TOURNAMENTS,a);return(0,t.onSnapshot)(c,t=>{t.exists()?s({id:t.id,...t.data()}):s(null)})},e.getRound=s,e.getTournamentRounds=c,e.saveRound=async function(a,s,c){const u=(0,t.doc)(n.db,o.COLLECTIONS.TOURNAMENTS,a,'rounds',s);await(0,t.setDoc)(u,{...c,id:s,updatedAt:(0,t.serverTimestamp)()},{merge:!0})},e.listenToRound=function(a,s,c){const u=(0,t.doc)(n.db,o.COLLECTIONS.TOURNAMENTS,a,'rounds',s);return(0,t.onSnapshot)(u,t=>{t.exists()?c({id:t.id,...t.data()}):c(null)})},e.getRoundScores=u,e.getHoleScores=async function(a,s){const c=o.generateIds.scoreId(a,s),u=(0,t.doc)(n.db,o.COLLECTIONS.SCORES,c),S=await(0,t.getDoc)(u);return S.exists()&&S.data().playerScores||{}},e.getPlayerScores=async function(t,n){const o=await u(t),a={};return Object.entries(o).forEach(([t,o])=>{o[n]&&(a[t]=o[n])}),a},e.saveScore=async function(a,s,c,u,S=""){const l=o.generateIds.scoreId(a,s),O=(0,t.doc)(n.db,o.COLLECTIONS.SCORES,l);(await(0,t.getDoc)(O)).exists()?await(0,t.updateDoc)(O,{[`playerScores.${c}`]:u,updatedAt:(0,t.serverTimestamp)()}):await(0,t.setDoc)(O,{id:l,roundId:a,tournamentId:S,holeNumber:s,playerScores:{[c]:u},createdAt:(0,t.serverTimestamp)(),updatedAt:(0,t.serverTimestamp)()})},e.saveScoresBatch=async function(a,c){const u=(0,t.writeBatch)(n.db),S=await s(a);Object.entries(c).forEach(([s,c])=>{const l=o.generateIds.scoreId(a,parseInt(s)),O=(0,t.doc)(n.db,o.COLLECTIONS.SCORES,l);u.set(O,{id:l,roundId:a,tournamentId:S?.tournamentId||'',holeNumber:parseInt(s),playerScores:c,updatedAt:(0,t.serverTimestamp)()},{merge:!0})}),await u.commit()},e.listenToHoleScores=function(a,s,c){const u=o.generateIds.scoreId(a,s),S=(0,t.doc)(n.db,o.COLLECTIONS.SCORES,u);return(0,t.onSnapshot)(S,t=>{t.exists()?c(t.data().playerScores||{}):c({})})},e.listenToRoundScores=function(a,s){const c=(0,t.query)((0,t.collection)(n.db,o.COLLECTIONS.SCORES),(0,t.where)('roundId','==',a));return(0,t.onSnapshot)(c,t=>{const n={};t.docs.forEach(t=>{const o=t.data();n[`hole-${o.holeNumber}`]=o.playerScores||{}}),s(n)})},e.getGame=async function(a){const s=(0,t.doc)(n.db,o.COLLECTIONS.GAMES,a),c=await(0,t.getDoc)(s);return c.exists()?{id:c.id,...c.data()}:null},e.getRoundGames=l,e.getTournamentGames=async function(a){const s=(0,t.query)((0,t.collection)(n.db,o.COLLECTIONS.GAMES),(0,t.where)('tournamentId','==',a));return(await(0,t.getDocs)(s)).docs.map(t=>({id:t.id,...t.data()}))},e.saveGame=async function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.GAMES,a);await(0,t.setDoc)(c,{...s,id:a,updatedAt:(0,t.serverTimestamp)()},{merge:!0})},e.updateGameResults=async function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.GAMES,a);await(0,t.updateDoc)(c,{results:s,updatedAt:(0,t.serverTimestamp)()})},e.updateGameStatus=async function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.GAMES,a);await(0,t.updateDoc)(c,{status:s,updatedAt:(0,t.serverTimestamp)()})},e.listenToGame=function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.GAMES,a);return(0,t.onSnapshot)(c,t=>{t.exists()?s({id:t.id,...t.data()}):s(null)})},e.listenToRoundGames=function(n,o){const a=S(n);return(0,t.onSnapshot)(a,t=>{const n=t.docs.map(t=>({id:t.id,...t.data()}));o(n)})},e.getCompleteRoundData=async function(t,n){const[o,a,c]=await Promise.all([s(t,n),u(n),l(n)]);return{...o,scores:a,games:c}},e.getCompleteTournamentData=async function(t){const n=await a(t);if(!n)return null;const o=await c(t),s=await Promise.all(o.map(async t=>{const[n,o]=await Promise.all([u(t.id),l(t.id)]);return{...t,scores:n,games:o}}));return{...n,rounds:s}},e.getLegacyTournament=async function(a){const s=(0,t.doc)(n.db,o.COLLECTIONS.INVITATION_CODES,a),c=await(0,t.getDoc)(s);return c.exists()?{id:c.id,...c.data()}:null},e.listenToLegacyTournament=function(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.INVITATION_CODES,a);return(0,t.onSnapshot)(c,t=>{t.exists()?s({id:t.id,...t.data()}):s(null)})};var t=r(d[0]),n=r(d[1]),o=r(d[2]);async function a(a){const s=(0,t.doc)(n.db,o.COLLECTIONS.TOURNAMENTS,a),c=await(0,t.getDoc)(s);return c.exists()?{id:c.id,...c.data()}:null}async function s(a,s){const c=(0,t.doc)(n.db,o.COLLECTIONS.TOURNAMENTS,a,'rounds',s),u=await(0,t.getDoc)(c);return u.exists()?{id:u.id,...u.data()}:null}async function c(a){const s=(0,t.collection)(n.db,o.COLLECTIONS.TOURNAMENTS,a,'rounds');return(await(0,t.getDocs)(s)).docs.map(t=>({id:t.id,...t.data()})).sort((t,n)=>(t.roundNumber||0)-(n.roundNumber||0))}async function u(a){const s=(0,t.query)((0,t.collection)(n.db,o.COLLECTIONS.SCORES),(0,t.where)('roundId','==',a)),c=await(0,t.getDocs)(s),u={};return c.docs.forEach(t=>{const n=t.data();u[`hole-${n.holeNumber}`]=n.playerScores||{}}),u}const S=a=>(0,t.query)((0,t.collection)(n.db,o.COLLECTIONS.GAMES),(0,t.or)((0,t.where)('roundIds','array-contains',a),(0,t.where)('roundId','==',a)));async function l(n){const o=S(n);return(await(0,t.getDocs)(o)).docs.map(t=>({id:t.id,...t.data()}))}},801,[797,796,1332]);
__d(function(g,r,i,a,m,_e,d){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return T}});var t=r(d[0]),o=r(d[1]),n=e(r(d[2])),l=e(r(d[3])),s=e(r(d[4])),c=e(r(d[5])),u=e(r(d[6])),f=e(r(d[7])),y=e(r(d[8])),h=r(d[9]),b=r(d[10]),p=r(d[11]),x=r(d[12]),S=r(d[13]),v=r(d[14]);const k=.65*y.default.get('window').height,j=.3*k;function z(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\ud83c\udfcc\ufe0f"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u}function I(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\ud83d\udcca"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u}function H(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\ud83d\udccb"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u}const P=[{key:'scorecard',label:'Scorecard',icon:z,route:'/scorecard'},{key:'games',label:'Games',icon:I,route:'/gameStatus'},{key:'leaderboard',label:'Board',icon:H,route:'/tournamentHome'},{key:'more',label:'More',icon:function(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\u2630"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u},route:null}],R=[{title:'Player',items:[{key:'scorecard',label:'Scorecard',icon:z,route:'/scorecard'},{key:'fullScorecard',label:'Full Scorecard',icon:z,route:'/fullScorecard'},{key:'games',label:'Game Status',icon:I,route:'/gameStatus'},{key:'leaderboard',label:'Leaderboard',icon:H,route:'/tournamentHome'},{key:'payouts',label:'Payouts',icon:function(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\ud83d\udcb0"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u},route:'/tournamentPayouts'}]},{title:'Display',items:[{key:'theme',label:'Text & Colors',icon:function(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\ud83c\udfa8"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u},route:'/settings/theme'}]},{title:'Admin',adminOnly:!0,items:[{key:'admin',label:'Admin Tools',icon:function(e){const o=(0,t.c)(4),{color:n,size:s}=e,c=s+4;let u;return o[0]!==n||o[1]!==s||o[2]!==c?(u=(0,v.jsx)(l.default,{style:{fontSize:s,color:n,lineHeight:c},children:"\u2699\ufe0f"}),o[0]=n,o[1]=s,o[2]=c,o[3]=u):u=o[3],u},route:'/admin'}]}];function w(e){return e.includes('scorecard')?'scorecard':e.includes('gameStatus')||e.includes('thirtyfourty')?'games':e.includes('tournamentHome')||e.includes('leaderboard')?'leaderboard':e.includes('tournamentPayouts')?'payouts':null}function T(e){const c=(0,t.c)(69),{children:y}=e,z=(0,h.useRouter)(),[I,H]=(0,o.useState)(!1);let T,O;c[0]===Symbol.for("react.memo_cache_sentinel")?(T=()=>(0,p.onAuthStateChanged)(x.auth,e=>H(!!e&&!e.isAnonymous)),O=[],c[0]=T,c[1]=O):(T=c[0],O=c[1]),(0,o.useEffect)(T,O);const L=(0,h.usePathname)(),_=(0,b.useSafeAreaInsets)(),N=(0,S.useTheme)(),[W,F]=(0,o.useState)(!1),[G]=(0,o.useState)(M),[E]=(0,o.useState)(B);let Y;c[2]!==L?(Y=w(L),c[2]=L,c[3]=Y):Y=c[3];const q=Y;let J;c[4]!==E||c[5]!==G?(J=()=>{F(!0),u.default.parallel([u.default.spring(G,{toValue:0,useNativeDriver:!0,damping:20}),u.default.timing(E,{toValue:.5,duration:250,useNativeDriver:!0})]).start()},c[4]=E,c[5]=G,c[6]=J):J=c[6];const K=J;let Q;c[7]!==E||c[8]!==G?(Q=()=>{u.default.parallel([u.default.spring(G,{toValue:k,useNativeDriver:!0,damping:20}),u.default.timing(E,{toValue:0,duration:250,useNativeDriver:!0})]).start(()=>F(!1))},c[7]=E,c[8]=G,c[9]=Q):Q=c[9];const U=Q;let X;c[10]!==U||c[11]!==G?(X=()=>f.default.create({onStartShouldSetPanResponder:A,onMoveShouldSetPanResponder:C,onPanResponderMove:(e,t)=>{t.dy>0&&G.setValue(t.dy)},onPanResponderRelease:(e,t)=>{t.dy>j?U():u.default.spring(G,{toValue:0,useNativeDriver:!0,damping:20}).start()},onPanResponderTerminate:(e,t)=>{t.dy>j?U():u.default.spring(G,{toValue:0,useNativeDriver:!0,damping:20}).start()}}),c[10]=U,c[11]=G,c[12]=X):X=c[12];const[Z]=(0,o.useState)(X);let $;c[13]!==U||c[14]!==z?($=e=>{U(),z.push(e)},c[13]=U,c[14]=z,c[15]=$):$=c[15];const ee=$,te=N.primary+"1A";let oe,re,ae,ne;c[16]!==y?(oe=(0,v.jsx)(n.default,{style:D.content,children:y}),c[16]=y,c[17]=oe):oe=c[17],c[18]!==U||c[19]!==E||c[20]!==W||c[21]!==N.overlay?(re=W&&(0,v.jsx)(u.default.View,{style:[D.overlay,{opacity:E,backgroundColor:N.overlay}],onStartShouldSetResponder:V,onResponderRelease:U}),c[18]=U,c[19]=E,c[20]=W,c[21]=N.overlay,c[22]=re):re=c[22],c[23]!==G?(ae=[{translateY:G}],c[23]=G,c[24]=ae):ae=c[24],c[25]!==ae||c[26]!==N.sheetBackground?(ne=[D.sheet,{backgroundColor:N.sheetBackground,transform:ae}],c[25]=ae,c[26]=N.sheetBackground,c[27]=ne):ne=c[27];const le=Z.panHandlers;let ie,se,ce,de,ue,fe,me;if(c[28]!==N.border?(ie=(0,v.jsx)(n.default,{style:[D.dragHandle,{backgroundColor:N.border}]}),c[28]=N.border,c[29]=ie):ie=c[29],c[30]!==q||c[31]!==te||c[32]!==I||c[33]!==ee||c[34]!==N.primary||c[35]!==N.textPrimary||c[36]!==N.textSecondary){let e,t;c[38]!==I?(e=e=>!e.adminOnly||I,c[38]=I,c[39]=e):e=c[39],c[40]!==q||c[41]!==te||c[42]!==ee||c[43]!==N.primary||c[44]!==N.textPrimary||c[45]!==N.textSecondary?(t=e=>(0,v.jsxs)(n.default,{children:[(0,v.jsx)(l.default,{style:[D.sectionHeader,{color:N.textSecondary}],children:e.title}),e.items.map(e=>{const t=e.icon,o=q===e.key;return(0,v.jsxs)(s.default,{style:[D.sheetItem,o&&{backgroundColor:te}],onPress:()=>ee(e.route),activeOpacity:.6,children:[(0,v.jsx)(t,{color:o?N.primary:N.textSecondary,size:20}),(0,v.jsx)(l.default,{style:[D.sheetItemText,{color:o?N.primary:N.textPrimary},o&&D.sheetItemTextActive],children:e.label})]},e.key)})]},e.title),c[40]=q,c[41]=te,c[42]=ee,c[43]=N.primary,c[44]=N.textPrimary,c[45]=N.textSecondary,c[46]=t):t=c[46],se=R.filter(e).map(t),c[30]=q,c[31]=te,c[32]=I,c[33]=ee,c[34]=N.primary,c[35]=N.textPrimary,c[36]=N.textSecondary,c[37]=se}else se=c[37];return c[47]!==Z.panHandlers||c[48]!==ne||c[49]!==ie||c[50]!==se?(ce=(0,v.jsxs)(u.default.View,{style:ne,...le,children:[ie,se]}),c[47]=Z.panHandlers,c[48]=ne,c[49]=ie,c[50]=se,c[51]=ce):ce=c[51],c[52]!==_.bottom||c[53]!==N.bottomBar?(de=[D.bar,{backgroundColor:N.bottomBar,paddingBottom:_.bottom}],c[52]=_.bottom,c[53]=N.bottomBar,c[54]=de):de=c[54],c[55]!==q||c[56]!==ee||c[57]!==K||c[58]!==N.activeIcon||c[59]!==N.inactiveIcon?(ue=P.map(e=>{const t=e.icon,o=q===e.key,c="more"===e.key;return(0,v.jsxs)(s.default,{style:D.barItem,accessibilityRole:c?"button":"tab",accessibilityLabel:c?"More options":e.label,accessibilityState:{selected:o},onPress:()=>c?K():ee(e.route),activeOpacity:.6,children:[(0,v.jsx)(n.default,{style:[D.activeMark,o&&{backgroundColor:N.activeIcon}]}),(0,v.jsx)(t,{color:o?N.activeIcon:N.inactiveIcon,size:22}),(0,v.jsx)(l.default,{maxFontSizeMultiplier:1.5,numberOfLines:1,adjustsFontSizeToFit:!0,style:[D.barLabel,o&&D.barLabelActive,{color:o?N.activeIcon:N.inactiveIcon}],children:e.label})]},e.key)}),c[55]=q,c[56]=ee,c[57]=K,c[58]=N.activeIcon,c[59]=N.inactiveIcon,c[60]=ue):ue=c[60],c[61]!==de||c[62]!==ue?(fe=(0,v.jsx)(n.default,{style:de,children:ue}),c[61]=de,c[62]=ue,c[63]=fe):fe=c[63],c[64]!==ce||c[65]!==fe||c[66]!==oe||c[67]!==re?(me=(0,v.jsxs)(n.default,{style:D.root,children:[oe,re,ce,fe]}),c[64]=ce,c[65]=fe,c[66]=oe,c[67]=re,c[68]=me):me=c[68],me}function V(){return!0}function C(e,t){return Math.abs(t.dy)>5}function A(){return!0}function B(){return new u.default.Value(0)}function M(){return new u.default.Value(k)}const D=c.default.create({root:{flex:1},content:{flex:1},bar:{flexDirection:'row',borderTopWidth:1,borderTopColor:'rgba(255,255,255,0.15)',paddingVertical:6,paddingHorizontal:4},barItem:{flex:1,alignItems:'center',justifyContent:'center',paddingVertical:4},barLabel:{fontSize:13,marginTop:2,fontWeight:'500'},barLabelActive:{fontWeight:'800'},activeMark:{width:28,height:3,borderRadius:2,marginBottom:4},overlay:{position:'absolute',top:0,left:0,right:0,bottom:0,zIndex:10},sheet:{position:'absolute',left:0,right:0,bottom:0,height:k,borderTopLeftRadius:20,borderTopRightRadius:20,zIndex:20,paddingTop:8,shadowColor:'#000',shadowOffset:{width:0,height:-4},shadowOpacity:.15,shadowRadius:8,elevation:12},dragHandle:{width:40,height:4,borderRadius:2,alignSelf:'center',marginBottom:16},sectionHeader:{fontSize:13,fontWeight:'600',letterSpacing:.8,paddingHorizontal:24,paddingVertical:8},sheetItem:{flexDirection:'row',alignItems:'center',paddingHorizontal:24,paddingVertical:14,gap:14},sheetItemText:{fontSize:16,fontWeight:'500'},sheetItemTextActive:{fontWeight:'600'}})},802,[793,12,109,188,230,28,102,223,134,794,271,1274,796,803,6]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.ThemeProvider=function(e){const c=(0,t.c)(8),{children:_}=e,[T,E]=(0,n.useState)(s.DEFAULT_THEME);let v,x,y;c[0]===Symbol.for("react.memo_cache_sentinel")?(v=()=>{(async()=>{try{const e=await o.default.getItem(f);if(e){const t=s.ALL_THEMES.find(t=>t.name===e);t&&E(t)}}catch{}})()},x=[],c[0]=v,c[1]=x):(v=c[0],x=c[1]);(0,n.useEffect)(v,x),c[2]===Symbol.for("react.memo_cache_sentinel")?(y=e=>{E(e),o.default.setItem(f,e.name).catch(l)},c[2]=y):y=c[2];const M=y;let C,L;c[3]!==T?(C={theme:T,setTheme:M},c[3]=T,c[4]=C):C=c[4];c[5]!==_||c[6]!==C?(L=(0,u.jsx)(h.Provider,{value:C,children:_}),c[5]=_,c[6]=C,c[7]=L):L=c[7];return L},_e.useTheme=function(){return(0,n.useContext)(h).theme},_e.useThemeContext=function(){return(0,n.useContext)(h)};var e,t=r(d[0]),n=r(d[1]),c=r(d[2]),o=(e=c)&&e.__esModule?e:{default:e},s=r(d[3]),u=r(d[4]);const f='appThemeName',h=(0,n.createContext)({theme:s.DEFAULT_THEME,setTheme:()=>{}});function l(){}},803,[793,12,795,1289,6]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.calculatePot=s,e.rankTeams=n,e.calculateTiePayouts=u,e.calculatePayouts=l,e.calculatePlayerSummary=c,e.calculateSettlements=function(t){const a=new Map,o=new Set;t.forEach(t=>{t.teams?.forEach(t=>{t.players?.forEach(t=>o.add(t))})}),o.forEach(o=>{const s=c(t,o);a.set(o,s)});return Array.from(a.values()).map(t=>({playerName:t.playerName,totalBet:t.totalBet,totalWinnings:t.totalWinnings,net:t.net,gamesPlayed:t.games.length})).sort((t,a)=>a.net-t.net)},e.validatePayoutStructure=function(t){const a=[],o=[];if(!t.config)return a.push('Game must have config'),{valid:!1,errors:a,warnings:o};const{betAmount:n,payoutMethod:u,payoutStructure:l}=t.config;(!n||n<=0)&&a.push('Bet amount must be greater than 0');u?['winnerTakesAll','multiPlace','separate'].includes(u)||a.push(`Invalid payout method: ${u}`):o.push('No payout method specified, defaulting to winnerTakesAll');if('multiPlace'===u)if(l&&l.places&&Array.isArray(l.places)){0===l.places.length&&a.push('Payout structure must have at least one place'),l.places.forEach((t,o)=>{(!t.place||t.place<=0)&&a.push(`Place ${o+1}: Invalid place number`),(!t.amount||t.amount<0)&&a.push(`Place ${o+1}: Invalid amount`)});const n=s(t),u=l.places.reduce((t,a)=>t+(a.amount||0),0);u>n?a.push(`Total payouts ($${u}) exceed pot ($${n})`):u<n&&o.push(`Total payouts ($${u}) are less than pot ($${n}). $${n-u} will not be distributed.`)}else a.push('Multi-place payout requires a payoutStructure with places array');return{valid:0===a.length,errors:a,warnings:o}},e.formatMoney=function(t){const a=`$${Math.abs(t).toFixed(2)}`;if(t>0)return`+${a}`;if(t<0)return`-${a}`;return a},e.formatPlace=function(t,a=!1){const o=['th','st','nd','rd'],s=t%100,n=t+(o[(s-20)%10]||o[s]||o[0]);return a?`T${t}`:n};var t=r(d[0]),a=r(d[1]),o=r(d[2]);function s(t){if(!t.config?.betAmount)return 0;let a=0;return t.teams&&Array.isArray(t.teams)&&t.teams.forEach(t=>{t.players&&Array.isArray(t.players)&&(a+=t.players.length)}),a*t.config.betAmount}function n(t){if(!t.teams||!t.results)return[];const a=t.teams.map(a=>{let o=0,s=0;return'matchplay'===t.format?(o=t.results.holesWon?.[a.teamId]||0,s=t.results.holesWon?.tied||0):'strokeplay'===t.format&&(o=-(t.results.teamScores?.[a.teamId]||999)),{...a,score:o,tiebreaker:s}});a.sort((t,a)=>t.score!==a.score?a.score-t.score:t.tiebreaker-a.tiebreaker);let o=1;for(let t=0;t<a.length;t++)t>0&&a[t].score!==a[t-1].score&&(o=t+1),a[t].place=o,a[t].isTied=t<a.length-1&&a[t].score===a[t+1].score;return a}function u(t,a){const o=t.length;let s=0;for(let t=0;t<o&&t<a.length;t++)s+=a[t].amount;return s/o}function l(l){if('nassau'===l.gameType)return(0,t.calculateNassauPayouts)(l);if('thirtyfourty'===l.gameType)return(0,a.calculateThirtyFourtyPayouts)(l);if('skins'===l.gameType){const t=l.config?.betAmount||0,a=(0,o.calculateSkinsPayouts)(l.results,t);return{pot:a.totalPot,distributed:a.distributed,carryover:a.carryover,payoutMethod:'skins',payouts:Object.entries(a.players).map(([a,o])=>({playerId:a,skinsWon:o.skinsWon,amount:o.amount,winRate:o.winRate,net:o.amount-t}))}}if('lownet'===l.gameType||'lowgross'===l.gameType){const t=l.results||{},a=t.payouts||{pot:0,distributed:0,payouts:[]};return{pot:a.pot,distributed:a.distributed,payoutMethod:l.config?.payoutMethod||'winnerTakesAll',complete:t.complete||!1,payouts:a.payouts}}if('lownetlowgross'===l.gameType){const t=l.results||{},a=t.payouts||{pot:0,distributed:0,payouts:[]};return{pot:a.pot,distributed:a.distributed,payoutMethod:'cooperative',complete:t.complete||!1,scoreVsDoublePar:t.summary?.scoreVsDoublePar||0,payouts:a.payouts}}const c=s(l),i=l.config?.betAmount||0,p=l.config?.payoutMethod||'winnerTakesAll';if(!l.results?.matchComplete&&'matchplay'===l.format)return{pot:c,payoutMethod:p,payouts:[],message:'Match not complete'};const y=n(l),h=[];if('winnerTakesAll'===p){const t=y.filter(t=>1===t.place),a=c/t.length;y.forEach(o=>{const s=1===o.place,n=s?a:0,u=n/o.players.length,l=o.players.map(t=>({playerName:t,betAmount:i,winnings:u,net:u-i}));h.push({teamId:o.teamId,teamName:o.teamName,place:o.place,isTied:s&&t.length>1,teamPayout:n,playerPayouts:l})})}else if('multiPlace'===p){const t=l.config?.payoutStructure?.places||[],a={};y.forEach(t=>{a[t.place]||(a[t.place]=[]),a[t.place].push(t)});let o=0;Object.keys(a).sort((t,a)=>Number(t)-Number(a)).forEach(s=>{const n=a[s],l=n.length,c=t.slice(o,o+l);let p=0;c.length>0&&(p=1===l?c[0]?.amount||0:u(n,c)),n.forEach(t=>{const a=p/t.players.length,o=t.players.map(t=>({playerName:t,betAmount:i,winnings:a,net:a-i}));h.push({teamId:t.teamId,teamName:t.teamName,place:Number(s),isTied:l>1,teamPayout:p,playerPayouts:o})}),o+=l})}return{pot:c,payoutMethod:p,payouts:h}}function c(t,a){let o=0,s=0;const n=[];return t.forEach(t=>{l(t).payouts.forEach(u=>{const l=u.playerPayouts.find(t=>t.playerName===a);l&&(o+=l.betAmount,s+=l.winnings,n.push({gameId:t.gameId,gameName:t.gameName||t.gameType,bet:l.betAmount,winnings:l.winnings,net:l.net,place:u.place}))})}),{playerName:a,totalBet:o,totalWinnings:s,net:s-o,games:n}}r(d[3]),r(d[4]),r(d[5])},806,[810,811,812,813,814,815]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.gameRef=o,e.loadGame=async function(n){const u=await(0,t.getDoc)(o(n));return u.exists()?{...u.data(),id:u.id,source:n.source??'global',roundId:n.roundId??u.data().roundId}:null},e.saveGame=async function(n,u){await(0,t.updateDoc)(o(n),{...u,updatedAt:(new Date).toISOString()})},e.playerNames=async function(o){const u={};return await Promise.all([...new Set(o)].map(async o=>{try{const s=await(0,t.getDoc)((0,t.doc)(n.db,'players',o)),c=s.exists()?s.data():null;u[o]=c&&(`${c.firstName??''} ${c.lastName??''}`.trim()||c.name)||o}catch{u[o]=o}})),u};var t=r(d[0]),n=r(d[1]);function o({id:o,tournamentId:u,source:s,roundId:c}){if('round'===s){if(!u||!c)throw new Error('Round games need tournamentId and roundId');return(0,t.doc)(n.db,'tournaments',u,'rounds',c,'games',o)}return(0,t.doc)(n.db,'games',o)}},807,[797,796]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(t,n){return!t||!t.holes||n<1||n>18?null:t.holes[n-1]||null}Object.defineProperty(e,'__esModule',{value:!0}),e.getCourseDisplayName=function(t){if(!t)return'Unknown Course';if(t.club_name&&t.course_name)return`${t.club_name} - ${t.course_name}`;return t.courseName||t.name||'Unknown Course'},e.getCourseLocation=function(t){if(!t)return'';if(t.location){const{city:n,state:u}=t.location;if(n&&u)return`${n}, ${u}`;if(n)return n;if(u)return u}return t.location||''},e.getTeesForGender=function(t,n){if(!t)return[];if(t.tees)return'F'===n&&t.tees.female?t.tees.female:'M'===n&&t.tees.male?t.tees.male:t.tees.male||t.tees.female||[];if(t.tees&&Array.isArray(t.tees))return t.tees.filter(t=>'F'===n?'F'===t.gender:!t.gender||'M'===t.gender);return[]},e.getTeeByGenderAndIndex=function(t,n,u){if(!t||!t.tees)return null;const o=t.tees[n];if(o&&Array.isArray(o)&&o[u])return o[u];return null},e.getHoleData=t,e.getHolePar=function(n,u){const o=t(n,u);return o?.par||4},e.getHoleYardage=function(n,u){const o=t(n,u);return o?.yardage||350},e.getHoleHandicap=function(n,u){const o=t(n,u);return o?.handicap||10},e.getTeePar=function(t){if(!t)return 72;if(t.par_total)return t.par_total;if(t.holes&&Array.isArray(t.holes))return t.holes.reduce((t,n)=>t+(n.par||0),0);return 72},e.isNewFormat=function(t){return!!(t&&t.club_name&&t.tees&&(t.tees.male||t.tees.female))}},808,[]);
__d(function(g,r,_i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"GAME_TYPES",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"HANDICAP_METHODS",{enumerable:!0,get:function(){return u}}),Object.defineProperty(e,"PAYOUT_METHODS",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"GAME_STATUSES",{enumerable:!0,get:function(){return c}}),Object.defineProperty(e,"FORMATS",{enumerable:!0,get:function(){return f}}),Object.defineProperty(e,"normalizeGameType",{enumerable:!0,get:function(){return s}}),Object.defineProperty(e,"normalizeHandicapMethod",{enumerable:!0,get:function(){return y}}),Object.defineProperty(e,"normalizePayoutMethod",{enumerable:!0,get:function(){return p}}),e.gameTypeInfo=function(t){return n.find(n=>n.id===s(t))},e.labelFor=function(n,t,i="\u2014"){return n.find(n=>n.id===t)?.name??t??i},e.payoutPlaces=function(n={}){const t=n.payoutStructure?.places;return Array.isArray(t)?t:[n.firstPlacePayout,n.secondPlacePayout].map((n,t)=>({place:t+1,amount:Number(n)||0})).filter(n=>n.amount>0)},e.withTeamIds=function(n=[]){return n.map((n,t)=>({...n,teamId:n.teamId||`team-${String.fromCharCode(97+t)}`}))};const n=[{id:'bestball',name:'Best Ball',teamsRequired:!0,minTeamSize:2,maxTeamSize:2},{id:'nassau',name:'Nassau',teamsRequired:!0,minTeamSize:1,maxTeamSize:2},{id:'thirtyfourty',name:'30/40 Ball',teamsRequired:!0,minTeamSize:3,maxTeamSize:4},{id:'skins',name:'Skins',teamsRequired:!1},{id:'lownet',name:'Low Net',teamsRequired:!1},{id:'lowgross',name:'Low Gross',teamsRequired:!1}],t={'3040ball':'thirtyfourty'},i={offlow:'offLow'},l={winner:'winnerTakesAll',multiple:'multiPlace'},u=[{id:'full',name:'Full Handicaps'},{id:'offLow',name:'Off Low Player'}],o=[{id:'winnerTakesAll',name:'Winner Takes All'},{id:'multiPlace',name:'Pay Multiple Places'},{id:'separate',name:'Separate Bets (Nassau front/back/overall)'}],c=[{id:'active',name:'Active'},{id:'completed',name:'Completed'},{id:'cancelled',name:'Cancelled'}],f=[{id:'matchplay',name:'Match Play'},{id:'strokeplay',name:'Stroke Play'}],s=n=>n?t[n]??n:'',y=n=>n?i[n]??n:'full',p=n=>n?l[n]??n:'winnerTakesAll'},809,[]);
__d(function(g,r,i,_a,m,e,d){"use strict";function t(t,s,l,a){let o='tied';return t>0&&s>0&&(t<s?o='team-a':s<t&&(o='team-b')),{hole:l,winner:o,teamAScore:t,teamBScore:s}}function s(t,s,l){const a={'team-a':0,'team-b':0,tied:0};let o=0,n=0;t.forEach(t=>{t.hole>=s&&t.hole<=l&&('team-a'===t.winner?(a['team-a']++,o+=1):'team-b'===t.winner?(a['team-b']++,n+=1):(a.tied++,o+=.5,n+=.5))});const u=a['team-a']+a['team-b']+a.tied,c=l-s+1,h=c-u,p=o-n,f=n-o;let b='E',y=null,w=0;p>0?(b=`+${p%1==0?p:p.toFixed(1)}`,y='team-a',w=p):f>0&&(b=`+${f%1==0?f:f.toFixed(1)}`,y='team-b',w=f);let P=!1,R=null;return(u===c||w>h)&&(P=!0,R=y),{status:b,holesWon:a,matchComplete:P,winner:R,holesPlayed:u,holesRemaining:h}}function l(t,s,l){let a=0,o=0,n=0;t.forEach(t=>{t.hole>=s&&t.hole<=l&&t.teamAScore>0&&t.teamBScore>0&&(a+=t.teamAScore,o+=t.teamBScore,n++)});const u=n===l-s+1;let c=null,h='E';if(n>0)if(a<o){h=`-${o-a}`,u&&(c='team-a')}else if(o<a){h=`-${a-o}`,u&&(c='team-b')}return{status:h,teamATotal:a,teamBTotal:o,matchComplete:u,winner:c,holesPlayed:n}}function a(t,s,l,a,o,n){if(!s.allowPresses)return null;if('matchplay'!==s.format)return null;if(t.matchComplete)return null;if(t.holesRemaining<2)return null;const u=s.autoPressAt||2,c=parseFloat(t.status.replace('+',''));if(Math.abs(c)<u)return null;if(l.some(t=>t.startHole===a&&!t.matchComplete))return null;const h=t.status.startsWith('+')?'team-a'===t.winner?'team-b':'team-a':null;return h?{pressNumber:l.length+1,startHole:a,endHole:n,pressingTeam:h,status:'E',holesWon:{'team-a':0,'team-b':0,tied:0},matchComplete:!1,winner:null}:null}Object.defineProperty(e,'__esModule',{value:!0}),e.calculateHoleResult=t,e.updateNassauAfterHole=function(o,n,u,c,h){const p=o.teams.find(t=>'team-a'===t.teamId),f=o.teams.find(t=>'team-b'===t.teamId);if(!p||!f)return o;const b=p.players.map(t=>u[t]||0).filter(t=>t>0),y=f.players.map(t=>u[t]||0).filter(t=>t>0);if(0===b.length||0===y.length)return o;const w=Math.min(...b),P=Math.min(...y),R=t(w,P,n,o.config);o.results.holeResults||(o.results.holeResults=[]);const A=o.results.holeResults.findIndex(t=>t.hole===n);A>=0?o.results.holeResults[A]=R:o.results.holeResults.push(R);if(o.results.holeResults.sort((t,s)=>t.hole-s.hole),'matchplay'===o.config.format){if(o.results.front9=s(o.results.holeResults,1,9),o.results.back9=s(o.results.holeResults,10,18),o.results.overall=s(o.results.holeResults,1,18),o.results.presses||(o.results.presses=[]),n<=9&&!o.results.front9.matchComplete){const t=a(o.results.front9,o.config,o.results.presses.filter(t=>9===t.endHole),n+1,1,9);t&&o.results.presses.push(t)}if(n>=10&&n<=18&&!o.results.back9.matchComplete){const t=a(o.results.back9,o.config,o.results.presses.filter(t=>18===t.endHole&&t.startHole>=10),n+1,10,18);t&&o.results.presses.push(t)}o.results.presses=o.results.presses.map(t=>{if(!t.matchComplete&&n>=t.startHole){const l=s(o.results.holeResults,t.startHole,t.endHole);return{...t,...l}}return t})}else o.results.front9=l(o.results.holeResults,1,9),o.results.back9=l(o.results.holeResults,10,18),o.results.overall=l(o.results.holeResults,1,18),o.results.presses=[];o.results.overall?.matchComplete&&(o.status='completed');return o},e.calculateNassauPayouts=function(t){const s=t.config?.betAmount||0,l=t.config?.pressAmount||s,a=t.teams.reduce((t,s)=>t+s.players.length,0),o=[];t.results.front9&&o.push({name:'Front 9',winner:t.results.front9.winner,amount:s*a,status:t.results.front9.matchComplete?'complete':'in_progress'});t.results.back9&&o.push({name:'Back 9',winner:t.results.back9.winner,amount:s*a,status:t.results.back9.matchComplete?'complete':'in_progress'});t.results.overall&&o.push({name:'Overall',winner:t.results.overall.winner,amount:s*a,status:t.results.overall.matchComplete?'complete':'in_progress'});t.results.presses&&t.results.presses.forEach(t=>{o.push({name:`Press #${t.pressNumber} (Holes ${t.startHole}-${t.endHole})`,winner:t.winner,amount:l*a,status:t.matchComplete?'complete':'in_progress',isPress:!0})});const n={};return t.teams.forEach(t=>{let l=0;o.forEach(s=>{s.winner===t.teamId?l+=s.amount:s.winner&&s.winner!==t.teamId&&(l-=s.amount)});const a=t.players.map(a=>({playerName:a,betAmount:3*s,winnings:l/t.players.length,net:l/t.players.length-3*s}));n[t.teamId]={teamId:t.teamId,teamPayout:l,playerPayouts:a}}),{bets:o,totalPot:s*a*3,teamPayouts:n,format:t.config.format}},e.validateNassauConfig=function(t){const s=[];(!t.betAmount||t.betAmount<=0)&&s.push('Nassau requires a bet amount greater than 0');'matchplay'!==t.format&&'strokeplay'!==t.format&&s.push('Nassau format must be either "matchplay" or "strokeplay"');t.allowPresses&&'matchplay'!==t.format&&s.push('Presses are only available in match play format');t.allowPresses&&t.autoPressAt&&t.autoPressAt<1&&s.push('Auto-press threshold must be at least 1');return{valid:0===s.length,errors:s}}},810,[]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.calculateHoleScoresVsPar=l,e.processHoleSelection=o,e.validateBallSelection=function(t,l,o,s){const a=4===s?20:15,n=9===t||18===t,c=l+o;if(c>a)return{valid:!1,message:`Cannot select ${o} balls. Would exceed limit (${c}/${a})`};if(n&&c!==a){return{valid:!1,message:`Must use exactly ${a-l} balls on hole ${t} to reach ${a} total`}}if(o>s)return{valid:!1,message:`Cannot select ${o} balls from ${s} players`};return{valid:!0,message:'Valid selection'}},e.calculateFinalScore=s,e.getRemainingBalls=function(t,l,o){const s=4===o?20:15,a=s-l,n=t>9,c=(n?18:9)-t+1,i=c>0?a/c:0;return{available:a,required:s,used:l,holesRemaining:c,mustUsePerHole:Math.round(10*i)/10}},e.updateThirtyFourtyAfterHole=function(a,n,c,i,u,h=null,p=null){a.results||(a.results={teams:{},winner:null,complete:!1});a.results.teams||(a.results.teams={});const{scores:f}=(0,t.netScoresForHole)(a,a.teams.flatMap(t=>t.players),c,h,p);a.teams.forEach(t=>{a.results.teams[t.teamId]||(a.results.teams[t.teamId]={front9:{holeSelections:[],totalBallsUsed:0,totalScore:0,complete:!1},back9:{holeSelections:[],totalBallsUsed:0,totalScore:0,complete:!1},finalScore:0,normalized:0});const c=a.results.teams[t.teamId],h=c[n<=9?'front9':'back9'],p=l(t.players.map(t=>f[t]),i),S=u?.[t.teamId]||t.players.map(()=>!1),y=o(n,p,S,t.teamSize);if(!y.error){const l=h.holeSelections.findIndex(t=>t.hole===n),o={hole:n,scoresVsPar:p,ballsSelected:S,ballsUsed:y.ballsUsedThisHole,holeScore:y.scoreFromThisHole};if(l>=0){const t=h.holeSelections[l].ballsUsed,s=h.holeSelections[l].holeScore;h.holeSelections[l]=o,h.totalBallsUsed=h.totalBallsUsed-t+y.ballsUsedThisHole,h.totalScore=h.totalScore-s+y.scoreFromThisHole}else h.holeSelections.push(o),h.totalBallsUsed+=y.ballsUsedThisHole,h.totalScore+=y.scoreFromThisHole;h.holeSelections.sort((t,l)=>t.hole-l.hole);const s=4===t.teamSize?20:15;(9===n||18===n)&&h.totalBallsUsed===s&&(h.complete=!0)}const b=s(c.front9.totalScore,c.back9.totalScore,t.teamSize??t.players.length);c.finalScore=b.finalScore,c.normalized=b.normalized});if(a.teams.every(t=>{const l=a.results.teams[t.teamId];return l?.front9?.complete&&l?.back9?.complete})){a.results.complete=!0;let t=1/0,l=null;a.teams.forEach(o=>{const s=a.results.teams[o.teamId];s.normalized<t&&(t=s.normalized,l=o.teamId)}),a.results.winner=l,a.status='completed'}return a},e.calculateThirtyFourtyPayouts=function(t){const l=t.config?.betAmount||0;let o=0;t.teams.forEach(t=>{o+=t.players.length});const s=o*l;if(!t.results.complete||!t.results.winner)return{pot:s,payoutMethod:'winnerTakesAll',payouts:[],message:'Game not complete'};const a=t.teams.map(l=>{const o=t.results.teams[l.teamId];return{...l,score:o.normalized,rawScore:o.finalScore}}).sort((t,l)=>t.score-l.score);let n=1;for(let t=0;t<a.length;t++)t>0&&a[t].score!==a[t-1].score&&(n=t+1),a[t].place=n,a[t].isTied=t<a.length-1&&a[t].score===a[t+1].score;const c=[],i=a.filter(t=>1===t.place),u=s/i.length;return a.forEach(t=>{const o=1===t.place,s=o?u:0,a=s/t.players.length,n=t.players.map(t=>({playerName:t,betAmount:l,winnings:a,net:a-l}));c.push({teamId:t.teamId,teamName:t.teamName,place:t.place,score:t.score,rawScore:t.rawScore,isTied:o&&i.length>1,teamPayout:s,playerPayouts:n})}),{pot:s,payoutMethod:'winnerTakesAll',payouts:c}},e.validateThirtyFourtyConfig=function(t,l){const o=[];(!t.betAmount||t.betAmount<=0)&&o.push('30/40 Ball requires a bet amount greater than 0');return l.forEach((t,l)=>{t.teamSize?3!==t.teamSize&&4!==t.teamSize?o.push(`Team ${l+1}: teamSize must be 3 or 4`):t.players.length!==t.teamSize&&o.push(`Team ${l+1}: has ${t.players.length} players but teamSize is ${t.teamSize}`):o.push(`Team ${l+1}: teamSize is required (3 or 4)`)}),{valid:0===o.length,errors:o,warnings:[]}};var t=r(d[0]);function l(t,l){return t.map(t=>'number'==typeof t?t-l:null)}function o(t,l,o,s){if(!l||!o)return{ballsUsedThisHole:0,scoreFromThisHole:0,error:'Missing score or selection data'};if(l.length!==s||o.length!==s)return{ballsUsedThisHole:0,scoreFromThisHole:0,error:`Expected ${s} scores and selections`};let a=0,n=0;for(let t=0;t<s;t++)if(o[t]){if(null===l[t]||void 0===l[t])return{ballsUsedThisHole:0,scoreFromThisHole:0,error:`Cannot select ball ${t+1} - no valid score`};a++,n+=l[t]}return{ballsUsedThisHole:a,scoreFromThisHole:n,error:null}}function s(t,l,o){const s=t+l,a=3===o?4*s/3:s;return{finalScore:s,normalized:Math.round(100*a)/100}}},811,[816]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return p}}),e.calculateHoleSkin=s,e.calculateSkinsGame=a,e.formatSkinsSummary=u,e.calculateTournamentSkins=l,e.getSkinsStatus=c,e.validateSkinsConfig=k,e.calculateSkinsPayouts=f,e.getCurrentStandings=h;var n=r(d[0]);function t(n,t){return n&&0!==n?n-t:999}function o(t,o,s){if(!s.useNetScoring)return 0;const a=t.courseHandicap||0;if('offLow'===s.handicapMethod||'offlow'===s.handicapMethod)return a>=o?1:0;const u=(s.handicapAllowance||100)/100,l=Math.round(a*u);return(0,n.strokesOnHole)(l,o)}function s(n,s,a,u){const l={};let c=999,k=null,f=[];Object.entries(n).forEach(([n,h])=>{if(!h||0===h)return void(l[n]=999);const p=t(h,o(s[n]||{},a,u));l[n]=p,p<c?(c=p,k=n,f=[n]):p===c&&p<999&&f.push(n)});const h=f.length>1;return{winner:h?null:k,netScores:l,tied:h,lowestScore:999===c?null:c,tiedPlayers:h?f:[]}}function a(n,t,o){const a={holes:[],skinsWon:{},totalSkins:n.length,skinsDistributed:0,carryoverValue:0,potValue:n.length*(o.betAmount||0),payouts:{}};Object.keys(t).forEach(n=>{a.skinsWon[n]=0});let u=0;n.forEach((n,l)=>{const c=s(n.scores,t,n.holeHandicap,o),k=1+u,f={holeNumber:n.holeNumber,winner:c.winner,netScores:c.netScores,tied:c.tied,tiedPlayers:c.tiedPlayers,lowestScore:c.lowestScore,skinsValue:k,carryoverFrom:u};c.tied||null===c.winner?(u+=1,f.status='carryover'):(a.skinsWon[c.winner]+=k,a.skinsDistributed+=k,f.status='won',u=0),a.holes.push(f)}),a.carryoverValue=u;const l=o.betAmount||0;return Object.entries(a.skinsWon).forEach(([n,t])=>{a.payouts[n]=t*l}),a}function u(n,t){const o={totalSkins:n.totalSkins,skinsWon:n.skinsDistributed,skinsCarried:n.carryoverValue,potValue:n.potValue,leaderboard:[]};return Object.entries(n.skinsWon).filter(([n,t])=>t>0).sort(([,n],[,t])=>t-n).forEach(([s,a])=>{const u=t[s]||{};o.leaderboard.push({playerId:s,playerName:`${u.firstName||''} ${u.lastName||''}`.trim()||'Unknown',skinsWon:a,payout:n.payouts[s]||0})}),o}function l(n,t,o){const s=[];n.forEach(n=>{n.holes&&n.holes.forEach(t=>{s.push({...t,roundId:n.roundId,roundName:n.roundName})})});const u=a(s,t,o);return u.rounds=n.length,u.totalHoles=s.length,u}function c(n,t){const o=t.findIndex(t=>t.holeNumber===n);if(-1===o)return{currentHole:n,currentPot:1,status:'pending',carryoverFrom:0};const s=t[o];return{currentHole:n,currentPot:s.skinsValue,status:s.status,winner:s.winner,carryoverFrom:s.carryoverFrom,netScores:s.netScores,tiedPlayers:s.tiedPlayers}}function k(n){const t=[];return(!n.betAmount||n.betAmount<=0)&&t.push('Bet amount must be greater than 0'),n.handicapAllowance&&(n.handicapAllowance<0||n.handicapAllowance>200)&&t.push('Handicap allowance must be between 0 and 200'),{valid:0===t.length,errors:t}}function f(n,t){const o={players:{},totalPot:n.totalSkins*t,distributed:n.skinsDistributed*t,carryover:n.carryoverValue*t};return Object.entries(n.skinsWon).forEach(([s,a])=>{a>0&&(o.players[s]={skinsWon:a,amount:a*t,winRate:(a/n.totalSkins*100).toFixed(1)+'%'})}),o}function h(n,t){return Object.entries(n.skinsWon).map(([o,s])=>{const a=t[o]||{};return{playerId:o,playerName:`${a.firstName||''} ${a.lastName||''}`.trim()||'Unknown',skinsWon:s,payout:n.payouts[o]||0}}).sort((n,t)=>t.skinsWon!==n.skinsWon?t.skinsWon-n.skinsWon:n.playerName.localeCompare(t.playerName))}var p={calculateHoleSkin:s,calculateSkinsGame:a,calculateTournamentSkins:l,formatSkinsSummary:u,getSkinsStatus:c,validateSkinsConfig:k,calculateSkinsPayouts:f,getCurrentStandings:h}},812,[816]);
__d(function(g,r,i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.calculateLowNet=function(o,a={},l=null){const u=a.handicapAllowance||100,c=new Map;l&&l.forEach(t=>{c.set(t,{playerId:t,grossStrokes:0,netStrokes:0,holesPlayed:0,roundsPlayed:0,roundDetails:[]})});o.forEach(o=>{const n=o.playerAssignments||{},a=o.course?.holes||[],p=o.scores||{},h=l||Object.keys(n),y={};h.forEach(o=>{const s=n[o]?.courseHandicap||0;y[o]=(0,t.calculatePlayingHandicap)(s,u)});let f={},k={},S={};h.forEach(t=>{f[t]=0,k[t]=0,S[t]=0});for(let t=1;t<=18;t++){const o=p[`hole-${t}`]||{},n=a[t-1]?.handicap||t;h.forEach(t=>{const a=o[t];if(!a||0===a)return;const l=a-s(y[t],n);f[t]+=a,k[t]+=l,S[t]+=1})}h.forEach(t=>{if(0===S[t])return;c.has(t)||c.set(t,{playerId:t,grossStrokes:0,netStrokes:0,holesPlayed:0,roundsPlayed:0,roundDetails:[]});const s=c.get(t);s.grossStrokes+=f[t],s.netStrokes+=k[t],s.holesPlayed+=S[t],s.roundsPlayed+=1,s.roundDetails.push({roundId:o.id,grossStrokes:f[t],netStrokes:k[t],holesPlayed:S[t],playingHandicap:y[t]})})});const p=Array.from(c.values()).filter(t=>t.holesPlayed>0).sort((t,o)=>t.netStrokes!==o.netStrokes?t.netStrokes-o.netStrokes:t.grossStrokes!==o.grossStrokes?t.grossStrokes-o.grossStrokes:0);p.forEach((t,o)=>{0===o?(t.position=1,t.isTied=!1):t.netStrokes===p[o-1].netStrokes?(t.position=p[o-1].position,t.isTied=!0,p[o-1].isTied=!0):(t.position=o+1,t.isTied=!1)});const h=n(p,a),y=p.length>0&&o.length>0;return{players:p,payouts:h,complete:y,totalRounds:o.length}},e.calculateLowNetPayouts=n;var t=r(d[0]),o=r(d[1]);function s(t,s){return(0,o.strokesOnHole)(t,s)}function n(t,o={}){const s=o.betAmount||0,n=t.length*s,a=o.payoutMethod||'winnerTakesAll',l=[];if(0===t.length)return{pot:0,distributed:0,payouts:l};if('winnerTakesAll'===a){const o=n/t.filter(t=>1===t.position).length;return t.forEach(t=>{const n=1===t.position;l.push({playerId:t.playerId,position:t.position,isTied:t.isTied,amount:n?o:0,net:(n?o:0)-s})}),{pot:n,distributed:n,payouts:l}}if('multiPlace'===a){const a=o.payoutStructure?.places||[],u={};t.forEach(t=>{u[t.position]||(u[t.position]=[]),u[t.position].push(t)});let c=0,p=0;return Object.keys(u).sort((t,o)=>Number(t)-Number(o)).forEach(t=>{const o=u[t],n=a.slice(p,p+o.length).reduce((t,o)=>t+(o.amount||0),0),h=o.length>0?n/o.length:0;o.forEach(t=>{l.push({playerId:t.playerId,position:t.position,isTied:t.isTied,amount:h,net:h-s}),c+=h}),p+=o.length}),{pot:n,distributed:c,payouts:l}}return t.forEach(t=>{l.push({playerId:t.playerId,position:t.position,isTied:t.isTied,amount:0,net:-s})}),{pot:n,distributed:0,payouts:l}}},813,[1331,816]);
__d(function(g,r,i,_a,m,e,d){"use strict";function o(o,s={}){const t=s.betAmount||0,n=o.length*t,l=s.payoutMethod||'winnerTakesAll',a=[];if(0===o.length)return{pot:0,distributed:0,payouts:a};if('winnerTakesAll'===l){const s=n/o.filter(o=>1===o.position).length;return o.forEach(o=>{const n=1===o.position;a.push({playerId:o.playerId,position:o.position,isTied:o.isTied,amount:n?s:0,net:(n?s:0)-t})}),{pot:n,distributed:n,payouts:a}}if('multiPlace'===l){const l=s.payoutStructure?.places||[],u={};o.forEach(o=>{u[o.position]||(u[o.position]=[]),u[o.position].push(o)});let p=0,c=0;return Object.keys(u).sort((o,s)=>Number(o)-Number(s)).forEach(o=>{const s=u[o],n=l.slice(c,c+s.length).reduce((o,s)=>o+(s.amount||0),0),h=s.length>0?n/s.length:0;s.forEach(o=>{a.push({playerId:o.playerId,position:o.position,isTied:o.isTied,amount:h,net:h-t}),p+=h}),c+=s.length}),{pot:n,distributed:p,payouts:a}}return o.forEach(o=>{a.push({playerId:o.playerId,position:o.position,isTied:o.isTied,amount:0,net:-t})}),{pot:n,distributed:0,payouts:a}}Object.defineProperty(e,'__esModule',{value:!0}),e.calculateLowGross=function(s,t={},n=null){const l=new Map;n&&n.forEach(o=>{l.set(o,{playerId:o,grossStrokes:0,holesPlayed:0,roundsPlayed:0,roundDetails:[]})});s.forEach(o=>{const s=o.scores||{},t=n||Object.keys(o.playerAssignments||{});let a={},u={};t.forEach(o=>{a[o]=0,u[o]=0});for(let o=1;o<=18;o++){const n=s[`hole-${o}`]||{};t.forEach(o=>{const s=n[o];s&&0!==s&&(a[o]+=s,u[o]+=1)})}t.forEach(s=>{if(0===u[s])return;l.has(s)||l.set(s,{playerId:s,grossStrokes:0,holesPlayed:0,roundsPlayed:0,roundDetails:[]});const t=l.get(s);t.grossStrokes+=a[s],t.holesPlayed+=u[s],t.roundsPlayed+=1,t.roundDetails.push({roundId:o.id,grossStrokes:a[s],holesPlayed:u[s]})})});const a=Array.from(l.values()).filter(o=>o.holesPlayed>0).sort((o,s)=>o.grossStrokes!==s.grossStrokes?o.grossStrokes-s.grossStrokes:0);a.forEach((o,s)=>{0===s?(o.position=1,o.isTied=!1):o.grossStrokes===a[s-1].grossStrokes?(o.position=a[s-1].position,o.isTied=!0,a[s-1].isTied=!0):(o.position=s+1,o.isTied=!1)});const u=o(a,t),p=a.length>0&&s.length>0;return{players:a,payouts:u,complete:p,totalRounds:s.length}},e.calculateLowGrossPayouts=o},814,[]);
__d(function(g,r,i,_a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.calculateLowNetLowGross=function(o,s={},l=null){const n=s.handicapAllowance||100,a=[];let u=0,p=0;o.forEach(o=>{const s=o.playerAssignments||{},c=o.course?.holes||[],y=o.scores||{},S=l||Object.keys(s);if(S.length<2)return;const h={};S.forEach(o=>{const t=s[o]?.courseHandicap||0;h[o]=(0,e.calculatePlayingHandicap)(t,n)});for(let e=1;e<=18;e++){const s=y[`hole-${e}`]||{},l=c[e-1]||{},n=l.par||4,f=l.handicap||e,b=t(s,h,n,f,S);b&&(a.push({holeNumber:e,roundId:o.id,...b}),u+=b.combinedScore,p+=b.doublePar)}});const y=a.length,S=18*o.length,h={totalCombinedScore:u,totalDoublePar:p,scoreVsDoublePar:u-p,holesPlayed:y,holesRemaining:S-y},f=y===S&&y>0,b=c(h,s,l);return{holeResults:a,summary:h,payouts:b,complete:f}},_e.calculateLowNetLowGrossPayouts=c;var e=r(d[0]),o=r(d[1]);function s(e,s){return(0,o.strokesOnHole)(e,s)}function t(e,o,t,c,l){const n=[];for(const t of l){const l=e[t];if(!l||0===l)return null;const a=s(o[t]||0,c);n.push({playerId:t,grossScore:l,netScore:l-a})}const a=[...n].sort((e,o)=>e.grossScore!==o.grossScore?e.grossScore-o.grossScore:o.netScore-e.netScore)[0],u=n.filter(e=>e.playerId!==a.playerId),p=u.reduce((e,o)=>o.netScore<e.netScore?o:e,u[0]),y=a.grossScore+p.netScore,S=2*t;return{par:t,doublePar:S,lowestGrossPlayer:a.playerId,lowestGrossScore:a.grossScore,lowestNetPlayer:p.playerId,lowestNetScore:p.netScore,combinedScore:y,scoreVsDoublePar:y-S,allPlayerScores:n.map(e=>({playerId:e.playerId,grossScore:e.grossScore,netScore:e.netScore,wasUsedFor:e.playerId===a.playerId?'gross':e.playerId===p.playerId?'net':null}))}}function c(e,o={},s=null){const t=o.betAmount||0;return{pot:(s?s.length:0)*t,distributed:0,payouts:(s||[]).map(e=>({playerId:e,amount:0,net:-t}))}}},815,[1331,816]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.strokesOnHole=c,e.netScoresForHole=function(o,t,s,u,l){const p={};if(Object.entries(s||{}).forEach(([n,c])=>{c>0&&(p[n]=c)}),!o.config?.useNetScoring||!u||!l)return{scores:p,playingHandicaps:null};const f=(0,n.calculatePlayingHandicaps)(t.map(n=>({name:n,courseHandicap:u[n]?.courseHandicap||0})),o.config.handicapMethod||'full',o.config.handicapAllowance||100),H=l.handicap||l.menHandicap||18,h={};return Object.entries(p).forEach(([n,o])=>{h[n]=o-c(f[n],H)}),{scores:h,playingHandicaps:f}};var n=r(d[0]);function c(n,c){const o=Math.round(n||0);return o&&c?o<0?c>18+o?-1:0:c<=o-18?2:c<=o?1:0:0}},816,[1333]);
__d(function(g,r,i,a,_m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.toMillis=function(t){return t?'string'==typeof t?Date.parse(t)||0:'function'==typeof t.toDate?t.toDate().getTime():1e3*(t.seconds??0):0},e.usDateToIso=function(t){const n=t.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);return n?`${n[3]}-${n[1].padStart(2,'0')}-${n[2].padStart(2,'0')}`:null},e.isoToUsDate=function(t){const n=t?.match(/^(\d{4})-(\d{2})-(\d{2})/);return n?`${n[2]}/${n[3]}/${n[1]}`:t??''}},817,[]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.useColorScheme=function(){const e=(0,t.c)(2),[c,n]=(0,u.useState)(!1);let l,s;e[0]===Symbol.for("react.memo_cache_sentinel")?(l=()=>{n(!0)},s=[],e[0]=l,e[1]=s):(l=e[0],s=e[1]);(0,u.useEffect)(l,s);const f=(0,o.default)();if(c)return f;return"light"};var e,t=r(d[0]),u=r(d[1]),c=r(d[2]),o=(e=c)&&e.__esModule?e:{default:e}},1273,[793,12,267]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})})},1274,[1328]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getAllCourses=a,e.getCourse=s,e.getCourseUsage=async function(a){try{console.log('Checking course usage for:',a);const s=(0,o.collection)(t.db,'tournaments'),n=(0,o.query)(s,(0,o.where)('courseId','==',a)),c=await(0,o.getDocs)(n),l=[];c.forEach(o=>{l.push({id:o.id,name:o.data().name})});let u=0;const i=await(0,o.getDocs)(s);for(const s of i.docs){const n=(0,o.collection)(t.db,'tournaments',s.id,'rounds');(await(0,o.getDocs)(n)).forEach(o=>{o.data().courseId===a&&u++})}return{tournaments:l,tournamentCount:l.length,roundCount:u,isUsed:l.length>0||u>0}}catch(o){return console.error('Error checking course usage:',o),{tournaments:[],tournamentCount:0,roundCount:0,isUsed:!1}}},e.updateCourseMetadata=async function(a,s){try{console.log('Updating course metadata:',a,s);const n=['club_name','course_name','location'],c={};for(const o of n)void 0!==s[o]&&(c[o]=s[o]);if(0===Object.keys(c).length)throw new Error('No valid fields to update');const l=(0,o.doc)(t.db,'courses',a);await(0,o.updateDoc)(l,c),console.log('Course metadata updated successfully')}catch(o){throw console.error('Error updating course metadata:',o),new Error('Failed to update course')}},e.deleteCourse=async function(a){try{console.log('Deleting course:',a);const s=(0,o.doc)(t.db,'courses',a);await(0,o.deleteDoc)(s),console.log('Course deleted successfully')}catch(o){throw console.error('Error deleting course:',o),new Error('Failed to delete course')}},e.createMinimalCourse=async function(a){try{if(console.log('Creating minimal course:',a),!a.club_name||!a.location?.city||!a.location?.state)throw new Error('Club name, city, and state are required');if(await n(a.club_name,a.course_name||'Main Course',a.location.city))throw new Error('A course with this name already exists in this city');const s={club_name:a.club_name.trim(),course_name:a.course_name?.trim()||'Main Course',location:{city:a.location.city.trim(),state:a.location.state.trim().toUpperCase(),address:a.location.address?.trim()||'',country:'United States'},tees:{male:[],female:[]},source:'manual',createdAt:(new Date).toISOString()},c=(0,o.doc)((0,o.collection)(t.db,'courses')),l=c.id;return await(0,o.setDoc)(c,s),console.log('Minimal course created successfully:',l),l}catch(o){throw console.error('Error creating minimal course:',o),o}},e.getCourseSummary=function(o){const t=o.club_name&&o.course_name;let a=[],s=[];if(t)a=o.tees?.male||[],s=o.tees?.female||[];else{const t=o.tees||[];a=t.filter(o=>!o.gender||'M'===o.gender),s=t.filter(o=>'F'===o.gender)}const n=a[0]||s[0],c=n?.par_total||n?.par||'N/A',l=t?`${o.club_name}${o.course_name?' - '+o.course_name:''}`:o.courseName||'Unknown Course',u=o.location||{},i=[u.city,u.state].filter(Boolean).join(', ')||'N/A';return{courseName:l,location:i,par:c,totalTees:a.length+s.length,maleTeeCount:a.length,femaleTeeCount:s.length,hasData:a.length+s.length>0,isNewFormat:t}},e.isValidStateCode=function(o){return['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].includes(o.toUpperCase())},e.updateCourse=c,e.addTee=async function(o,t,a){try{console.log('Adding tee to course:',o,t);const n=await s(o);n.tees||(n.tees={male:[],female:[]}),'male'===t?(n.tees.male=n.tees.male||[],n.tees.male.push(a)):(n.tees.female=n.tees.female||[],n.tees.female.push(a)),await c(o,n),console.log('Tee added successfully')}catch(o){throw console.error('Error adding tee:',o),new Error('Failed to add tee')}},e.updateTee=async function(o,t,a,n){try{console.log('Updating tee:',o,t,a);const l=await s(o);'male'===t?l.tees.male[a]=n:l.tees.female[a]=n,await c(o,l),console.log('Tee updated successfully')}catch(o){throw console.error('Error updating tee:',o),new Error('Failed to update tee')}},e.deleteTee=async function(o,t,a){try{console.log('Deleting tee:',o,t,a);const n=await s(o);'male'===t?n.tees.male.splice(a,1):n.tees.female.splice(a,1),await c(o,n),console.log('Tee deleted successfully')}catch(o){throw console.error('Error deleting tee:',o),new Error('Failed to delete tee')}},e.calculateHoleTotals=function(o){if(!o||0===o.length)return{par:0,yardage:0};return o.reduce((o,t)=>({par:o.par+(t.par||0),yardage:o.yardage+(t.yardage||0)}),{par:0,yardage:0})},e.validateTeeData=function(o){const t=[];o.tee_name&&0!==o.tee_name.trim().length||t.push('Tee name is required');o.course_rating&&(o.course_rating<50||o.course_rating>80)&&t.push('Course rating must be between 50 and 80');o.slope_rating&&(o.slope_rating<55||o.slope_rating>155)&&t.push('Slope rating must be between 55 and 155');if(o.holes&&o.holes.length>0){18!==o.holes.length&&t.push('Tee must have exactly 18 holes'),o.holes.forEach((o,a)=>{o.par&&[3,4,5].includes(o.par)||t.push(`Hole ${a+1}: Par must be 3, 4, or 5`),(!o.yardage||o.yardage<50||o.yardage>700)&&t.push(`Hole ${a+1}: Yardage must be between 50 and 700`),o.handicap&&(o.handicap<1||o.handicap>18)&&t.push(`Hole ${a+1}: Handicap must be between 1 and 18`)});const a=o.holes.map(o=>o.handicap).filter(Boolean),s=new Set(a);a.length>0&&a.length!==s.size&&t.push('Handicaps must be unique (no duplicates)')}return{valid:0===t.length,errors:t}},e.createBlankHoles=function(o=18){const t=[];for(let a=1;a<=o;a++)t.push({hole_number:a,par:4,yardage:400,handicap:a});return t};var o=r(d[0]),t=r(d[1]);async function a(){if(console.log('getAllCourses: Starting...'),console.log('getAllCourses: db instance:',t.db),!t.db)throw new Error('Firebase database not initialized');console.log('getAllCourses: Creating collection reference...');const a=(0,o.collection)(t.db,'courses');console.log('getAllCourses: Collection reference created:',a),console.log('getAllCourses: Fetching documents...');const s=await(0,o.getDocs)(a);console.log('getAllCourses: Snapshot received, size:',s.size);const n=[];return s.forEach(o=>{const t={id:o.id,...o.data()};console.log('getAllCourses: Processing course:',t.id,t),n.push(t)}),console.log('getAllCourses: Total courses loaded:',n.length),n.sort((o,t)=>{const a=o.club_name||o.courseName||'',s=t.club_name||t.courseName||'';return a.localeCompare(s)}),console.log('getAllCourses: Courses sorted, returning...'),n}async function s(a){try{const s=(0,o.doc)(t.db,'courses',a),n=await(0,o.getDoc)(s);if(!n.exists())throw new Error('Course not found');return{id:n.id,...n.data()}}catch(o){throw console.error('Error loading course:',o),o}}async function n(o,t,s){try{const n=await a(),c=o.toLowerCase(),l=t.toLowerCase(),u=s.toLowerCase();return n.some(o=>{const t=(o.club_name||'').toLowerCase(),a=(o.course_name||o.courseName||'').toLowerCase(),s=(o.location?.city||'').toLowerCase();return t===c&&a===l&&s===u})}catch(o){return console.error('Error checking for duplicate course:',o),!1}}async function c(a,s){try{console.log('Updating entire course:',a);const n=(new Date).toISOString(),c={...s,metadata:{...s.metadata,last_modified:n,modified_by:'admin',is_custom:!0}},l=(0,o.doc)(t.db,'courses',a);await(0,o.setDoc)(l,c),console.log('Course updated successfully')}catch(o){throw console.error('Error updating course:',o),new Error('Failed to update course')}}},1275,[797,796]);
__d(function(g,r,_i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.getAllTournaments=async function(){try{const o=(0,t.collection)(n.db,'tournaments'),c=(0,t.query)(o,(0,t.orderBy)('createdAt','desc')),s=await(0,t.getDocs)(c),i=[];return s.forEach(t=>{i.push({id:t.id,...t.data()})}),i}catch(t){throw console.error('Error loading tournaments:',t),new Error('Failed to load tournaments')}},e.getTournament=o,e.createTournament=async function(o){try{if(console.log('Creating tournament:',o),!o.name||!o.inviteCode)throw new Error('Tournament name and invite code are required');if(await s(o.inviteCode))throw new Error('This invite code is already in use');const c={name:o.name.trim(),inviteCode:o.inviteCode.trim().toUpperCase(),date:o.date||(new Date).toISOString(),description:o.description?.trim()||'',status:o.status||'active',players:[],createdAt:(new Date).toISOString(),updatedAt:(new Date).toISOString()},i=(0,t.doc)((0,t.collection)(n.db,'tournaments')),u=i.id;return await(0,t.setDoc)(i,c),console.log('Tournament created successfully:',u),u}catch(t){throw console.error('Error creating tournament:',t),t}},e.updateTournament=async function(o,c){try{console.log('Updating tournament:',o,c);const s={...c,updatedAt:(new Date).toISOString()},i=(0,t.doc)(n.db,'tournaments',o);await(0,t.updateDoc)(i,s),console.log('Tournament updated successfully')}catch(t){throw console.error('Error updating tournament:',t),new Error('Failed to update tournament')}},e.deleteTournament=async function(o){try{console.log('Deleting tournament:',o);const s=await c(o),i=(0,t.collection)(n.db,'tournaments',o,'rounds'),u=await(0,t.getDocs)(i);for(const c of u.docs){const s=(0,t.collection)(n.db,'tournaments',o,'rounds',c.id,'games'),i=await(0,t.getDocs)(s);for(const n of i.docs)await(0,t.deleteDoc)(n.ref);await(0,t.deleteDoc)(c.ref)}const l=(0,t.doc)(n.db,'tournaments',o);return await(0,t.deleteDoc)(l),console.log('Tournament deleted successfully'),{tournamentId:o,roundsDeleted:s.roundCount,gamesDeleted:s.gameCount}}catch(t){throw console.error('Error deleting tournament:',t),new Error('Failed to delete tournament')}},e.getTournamentStats=c,e.generateInviteCode=function(){const t='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let n='';for(let o=0;o<8;o++)n+=t.charAt(Math.floor(32*Math.random()));return n},e.validateInviteCode=function(t){if(!t||0===t.trim().length)return{valid:!1,error:'Invite code is required'};const n=t.trim();if(n.length<6||n.length>12)return{valid:!1,error:'Invite code must be 6-12 characters'};if(!/^[A-Z0-9]+$/i.test(n))return{valid:!1,error:'Invite code must be alphanumeric only'};return{valid:!0,error:null}},e.categorizeTournaments=function(t){const n=[],o=[];return t.forEach(t=>{'archived'===t.status||'completed'===t.status?o.push(t):n.push(t)}),{active:n,past:o}};var t=r(d[0]),n=r(d[1]);async function o(o){try{const c=(0,t.doc)(n.db,'tournaments',o),s=await(0,t.getDoc)(c);if(!s.exists())throw new Error('Tournament not found');return{id:s.id,...s.data()}}catch(t){throw console.error('Error loading tournament:',t),t}}async function c(c){try{const s=await o(c),i=(0,t.collection)(n.db,'tournaments',c,'rounds'),u=await(0,t.getDocs)(i),l=u.size;let w=0;for(const o of u.docs){const s=(0,t.collection)(n.db,'tournaments',c,'rounds',o.id,'games');w+=(await(0,t.getDocs)(s)).size}return{playerCount:s.players?.length||0,roundCount:l,gameCount:w,status:s.status}}catch(t){return console.error('Error getting tournament stats:',t),{playerCount:0,roundCount:0,gameCount:0,status:'unknown'}}}async function s(o){try{const c=(0,t.collection)(n.db,'tournaments'),s=(0,t.query)(c,(0,t.where)('inviteCode','==',o.toUpperCase()));return!(await(0,t.getDocs)(s)).empty}catch(t){return console.error('Error checking duplicate invite code:',t),!1}}},1281,[797,796]);
__d(function(g,r,_i,_a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.autoAssignPlayersRandom=function(t,n){const s=[...t].sort(()=>Math.random()-.5),a=[],o=Math.ceil(s.length/n);for(let t=0;t<n;t++){const n=t*o,u=Math.min(n+o,s.length),l=s.slice(n,u);l.length>0&&a.push({groupNumber:t+1,players:l.map(t=>t.id)})}return a},e.autoAssignPlayersByHandicap=function(t,n){const s=[...t].sort((t,n)=>(t.handicapIndex||999)-(n.handicapIndex||999)),a=Array.from({length:n},(t,n)=>({groupNumber:n+1,players:[]}));let o=0,u=1;for(let t=0;t<s.length;t++)a[o].players.push(s[t].id),1===u?(o++,o>=n&&(o=n-1,u=-1)):(o--,o<0&&(o=0,u=1));return a},e.calculateCourseHandicap=function(t,n){if(!t||!n||!n.slope_rating)return 0;const s=n.slope_rating||113,a=n.course_rating||n.par_total||72,o=n.par_total||72,u=t*(s/113)+(a-o);return Math.round(u)},e.suggestTeeForPlayer=function(t,n){if(!n||!n.tees||0===n.tees.length)return null;const s=t.gender||'male',a=t.handicapIndex||15,o=n.tees.filter(t=>t.gender===s);if(0===o.length)return n.tees[0];if('male'===s){if(a<=10)return o[o.length-1];if(a<=20){return o[Math.floor(o.length/2)]}return o[0]}return a<=15?o[o.length-1]:o[0]},e.generateTeeTimes=function(t,n,s=10){const a=[],[o,u]=t.split(' '),[l,i]=o.split(':').map(Number);let p=60*l+i;'PM'===u&&12!==l?p+=720:'AM'===u&&12===l&&(p=i);for(let t=0;t<n;t++){const n=p+t*s,o=Math.floor(n/60)%24,u=o%12||12,l=o<12?'AM':'PM',i=(n%60).toString().padStart(2,'0');a.push(`${u}:${i} ${l}`)}return a},e.validateRoundData=function(t,n){const s=[];t.name&&t.name.trim()||s.push('Round name is required');t.courseId||s.push('Course selection is required');t.groups&&0!==t.groups.length||s.push('At least one group is required');const a=new Set;t.groups?.forEach(t=>{t.players?.forEach(t=>{a.has(t)&&s.push(`Player ${t} is assigned to multiple groups`),a.add(t)})}),t.groups?.forEach((t,n)=>{(t.players?.length||0)>4&&s.push(`Group ${n+1} cannot have more than 4 players`)}),t.playerAssignments&&a.forEach(n=>{const a=t.playerAssignments[n];a&&a.teeName||s.push(`Player ${n} does not have a tee assignment`)});return{valid:0===s.length,errors:s}}},1282,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"classicPro",{enumerable:!0,get:function(){return F}}),Object.defineProperty(e,"modernLinks",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"earthyExecutive",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"ALL_THEMES",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"DEFAULT_THEME",{enumerable:!0,get:function(){return c}});const F={name:'The Classic Pro',background:'#FFFFFF',card:'#F7F7F7',textPrimary:'#1A1A1A',textSecondary:'#4A4A4A',textOnPrimary:'#FFFFFF',textOnSecondary:'#FFFFFF',primary:'#004729',secondary:'#BBBBBD',border:'#E0E0E0',cardEdge:'#858585',bottomBar:'#004729',activeIcon:'#FFFFFF',inactiveIcon:'#B5D9C6',sheetBackground:'#FFFFFF',overlay:'rgba(0, 0, 0, 0.5)',scorePositive:'#004729',scoreNegative:'#C0392B',scoreNeutral:'#4A4A4A'},t={name:'The Modern Links',background:'#F5F5F9',card:'#FFFFFF',textPrimary:'#1A1A2E',textSecondary:'#45456A',textOnPrimary:'#FFFFFF',textOnSecondary:'#1A1A2E',primary:'#004E8F',secondary:'#FECC00',border:'#E0E0E8',cardEdge:'#80809A',bottomBar:'#004E8F',activeIcon:'#FECC00',inactiveIcon:'#E6F0F8',sheetBackground:'#FFFFFF',overlay:'rgba(0, 0, 50, 0.5)',scorePositive:'#1E7A3A',scoreNegative:'#D63031',scoreNeutral:'#45456A'},n={name:'The Earthy Executive',background:'#FAF9F2',card:'#FFFFFF',textPrimary:'#2C2C2C',textSecondary:'#4D535B',textOnPrimary:'#FFFFFF',textOnSecondary:'#FFFFFF',primary:'#664638',secondary:'#4D535B',border:'#E8E4DC',cardEdge:'#8A847A',bottomBar:'#664638',activeIcon:'#FFFFFF',inactiveIcon:'#F5ECE6',sheetBackground:'#FAF9F2',overlay:'rgba(40, 30, 20, 0.5)',scorePositive:'#2E7D4F',scoreNegative:'#C0392B',scoreNeutral:'#4D535B'},o=[F,t,n],c=F},1289,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},1290,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(function(t,n){for(var u in n)Object.defineProperty(t,u,{enumerable:!0,get:Object.getOwnPropertyDescriptor(n,u).get})})(e,{get Badge(){return x.Badge},get DarkTheme(){return _.DarkTheme},get DefaultTheme(){return y.DefaultTheme},get ErrorBoundary(){return b.ErrorBoundary},get ExperimentalStack(){return G.ExperimentalStack},get ExpoRoot(){return c.ExpoRoot},get Icon(){return x.Icon},get IsWithinNativeNavigator(){return j.IsWithinNativeNavigator},get Label(){return x.Label},get LocaleProvider(){return I.LocaleProvider},get NativeStackView(){return H.NativeStackView},get NavigationAwareActivity(){return R.NavigationAwareActivity},get Navigator(){return t.Navigator},get RouterActionHandling(){return E.RouterActionHandling},get Sitemap(){return p.Sitemap},get Slot(){return t.Slot},get SplashScreen(){return S},get StackRouter(){return E.StackRouter},get SuspenseFallback(){return f.SuspenseFallback},get TabRouter(){return E.TabRouter},get Tabs(){return M.Tabs},get ThemeProvider(){return T.ThemeProvider},get Unmatched(){return l.Unmatched},get VectorIcon(){return x.VectorIcon},get attachRouteState(){return E.attachRouteState},get createBaseStackProps(){return D.createBaseStackProps},get createBaseTabProps(){return W.createBaseTabProps},get createNativeStackProps(){return B.createNativeStackProps},get createStandardRouterNavigator(){return j.createStandardRouterNavigator},get enableLegacyHeaderAppearance(){return C.enableLegacyHeaderAppearance},get extendRouter(){return E.extendRouter},get extendRouterActions(){return E.extendRouterActions},get integrateWithRouter(){return j.integrateWithRouter},get isActionHandled(){return E.isActionHandled},get router(){return u.router},get unstable_PerformanceObserver(){return F.unstable_PerformanceObserver},get unstable_createStandardRouterNavigator(){return j.unstable_createStandardRouterNavigator},get unstable_enablePerformanceIntegration(){return F.unstable_enablePerformanceIntegration},get unstable_integrateWithRouter(){return j.unstable_integrateWithRouter},get unstable_performance(){return F.unstable_performance},get unstable_useIsNavigating(){return o.useIsNavigating},get useCurrentRouteInfo(){return n.useCurrentRouteInfo},get useFocusEffect(){return h.useFocusEffect},get useGlobalSearchParams(){return n.useGlobalSearchParams},get useIsFocused(){return N.useIsFocused},get useLoaderData(){return n.useLoaderData},get useLocalSearchParams(){return n.useLocalSearchParams},get useNavigation(){return P.useNavigation},get useNavigationContainerRef(){return n.useNavigationContainerRef},get usePathname(){return n.usePathname},get usePreventRemove(){return L.usePreventRemove},get useRootNavigation(){return n.useRootNavigation},get useRootNavigationState(){return n.useRootNavigationState},get useRoute(){return A.useRoute},get useRoutePath(){return O.useRoutePath},get useRouter(){return n.useRouter},get useScrollToTop(){return w.useScrollToTop},get useSegments(){return n.useSegments},get useSitemap(){return v.useSitemap},get useTheme(){return k.useTheme},get useUnstableGlobalHref(){return n.useUnstableGlobalHref},get withLayoutContext(){return s.withLayoutContext}});const t=r(d[0]),n=r(d[1]),u=r(d[2]),o=r(d[3]),s=r(d[4]),c=r(d[5]),l=r(d[6]),p=r(d[7]),v=r(d[8]),b=r(d[9]),f=r(d[10]),R=r(d[11]),S=V(r(d[12])),P=r(d[13]),h=r(d[14]),N=r(d[15]),_=r(d[16]),y=r(d[17]),T=r(d[18]),k=r(d[19]),I=r(d[20]),O=r(d[21]),w=r(d[22]),A=r(d[23]),L=r(d[24]),x=r(d[25]),j=r(d[26]),D=r(d[27]),W=r(d[28]),B=r(d[29]),E=r(d[30]),H=r(d[31]),C=r(d[32]),F=r(d[33]),M=r(d[34]),G=r(d[35]);function U(t){if("function"!=typeof WeakMap)return null;var n=new WeakMap,u=new WeakMap;return(U=function(t){return t?u:n})(t)}function V(t,n){if(!n&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var u=U(n);if(u&&u.has(t))return u.get(t);var o={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in t)if("default"!==c&&Object.prototype.hasOwnProperty.call(t,c)){var l=s?Object.getOwnPropertyDescriptor(t,c):null;l&&(l.get||l.set)?Object.defineProperty(o,c,l):o[c]=t[c]}return o.default=t,u&&u.set(t,o),o}},1291,[667,402,493,1292,685,14,739,730,733,1293,614,612,617,514,518,523,462,464,428,429,1294,469,470,459,457,505,684,698,1295,697,340,676,681,361,1296,1299]);
__d(function(g,r,i,a,m,e,d){"use strict";function n(){const t=r(d[0]);return n=function(){return t},t}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"useIsNavigating",{enumerable:!0,get:function(){return u}});const t=r(d[1]);function u(){return(0,n().use)(t.NavigationPendingContext)}},1292,[12,358]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(){const o=r(d[0]);return t=function(){return o},o}function o(){const t=r(d[1]);return o=function(){return t},t}function n(){const t=r(d[2]);return n=function(){return t},t}function l(){const t=r(d[3]);return l=function(){return t},t}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"ErrorBoundary",{enumerable:!0,get:function(){return f}});r(d[4]);const s=r(d[5]),c=r(d[6]),u=r(d[7]);function h({error:o}){return(0,t().jsxs)(n().View,{style:{marginBottom:12,gap:4,flexWrap:'wrap'},children:[(0,t().jsx)(n().Text,{role:"heading","aria-level":1,style:y.title,children:"Something went wrong"}),(0,t().jsxs)(n().Text,{testID:"router_error_message",role:"heading","aria-level":2,style:y.errorMessage,children:["Error: ",o.message]})]})}function f({error:f,retry:x}){const w=(0,o().use)(s.BottomTabBarHeightContext)?n().View:l().SafeAreaView,S=f instanceof c.ReactServerError;return(0,t().jsx)(n().View,{style:y.container,children:(0,t().jsxs)(w,{style:{flex:1,gap:8,maxWidth:720,marginHorizontal:'auto'},children:[S?(0,t().jsx)(b,{error:f}):(0,t().jsx)(h,{error:f}),(0,t().jsx)(n().View,{style:{flex:1}}),!1,(0,t().jsx)(u.Pressable,{testID:"router_error_retry",onPress:x,children:({hovered:o,pressed:l})=>(0,t().jsx)(n().View,{style:[y.buttonInner,(o||l)&&{backgroundColor:'white'}],children:(0,t().jsx)(n().Text,{style:[y.buttonText,{color:o||l?'black':'white'}],children:"Retry"})})})]})})}const x={404:'NOT_FOUND',500:'INTERNAL_SERVER_ERROR',503:'SERVICE_UNAVAILABLE',504:'GATEWAY_TIMEOUT'};function b({error:o}){let l=String(o.statusCode);l+=': '+(x[o.statusCode]??'Server Error');const s=o.headers.get('cf-ray'),c=o.headers.get('Date');return(0,t().jsxs)(n().View,{style:{padding:12,gap:8},children:[(0,t().jsx)(n().Text,{selectable:!0,allowFontScaling:!0,style:{fontSize:n().Platform.select({web:24,default:16}),fontWeight:'bold',marginBottom:4,color:'white'},children:l}),(0,t().jsx)(n().ScrollView,{style:{borderColor:'rgba(255,255,255,0.5)',borderTopWidth:n().StyleSheet.hairlineWidth,borderBottomWidth:n().StyleSheet.hairlineWidth,maxHeight:150},contentContainerStyle:{paddingVertical:4},children:(0,t().jsx)(n().Text,{testID:"router_error_message",selectable:!0,allowFontScaling:!0,style:{color:'white'},children:o.message})}),(0,t().jsx)(w,{title:"Code",right:o.statusCode}),s&&(0,t().jsx)(w,{title:"ID",right:s}),c&&(0,t().jsx)(w,{title:"Date",right:c}),o.url&&(0,t().jsx)(n().Text,{selectable:!0,allowFontScaling:!0,style:{fontSize:14,opacity:.5,color:'white'},children:o.url})]})}function w({title:o,right:l}){const s={fontSize:16,color:'white'};return(0,t().jsxs)(n().View,{style:{flexDirection:'row',justifyContent:'space-between'},children:[(0,t().jsx)(n().Text,{selectable:!0,allowFontScaling:!0,style:s,children:o}),l&&(0,t().jsx)(n().Text,{selectable:!0,allowFontScaling:!0,style:[s,y.code],children:l})]})}const y=n().StyleSheet.create({container:{flex:1,backgroundColor:'black',padding:24,alignItems:'stretch',justifyContent:'center'},title:{color:'white',fontSize:n().Platform.select({web:32,default:24}),fontWeight:'bold'},buttonText:{fontSize:18,fontWeight:'bold',color:'black',...n().Platform.select({web:{transitionDuration:'100ms'}})},buttonInner:{...n().Platform.select({web:{transitionDuration:'100ms'}}),paddingVertical:12,paddingHorizontal:24,borderColor:'white',borderWidth:2,marginLeft:8,justifyContent:'center',alignItems:'center'},code:{fontFamily:n().Platform.select({default:'Courier',ios:'Courier New',android:'monospace'}),fontWeight:'500'},errorMessage:{color:'white',fontSize:16},subtitle:{color:'white',fontSize:14,marginBottom:12},link:{color:'rgba(255,255,255,0.4)',textDecorationStyle:'solid',textDecorationLine:'underline',fontSize:14,textAlign:'center'}})},1293,[6,12,15,271,489,526,616,732]);
__d(function(g,r,i,a,m,e,d){"use strict";function n(){const t=r(d[0]);return n=function(){return t},t}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"LocaleProvider",{enumerable:!0,get:function(){return o}});const t=r(d[1]);function o({direction:o,children:c}){return(0,n().jsx)(t.LocaleDirContext.Provider,{value:o,children:c})}},1294,[6,410]);
__d(function(g,r,i,a,m,e,d){"use strict";function t({dispatch:t,isPreloaded:o,isRemovalPrevented:n,state:s}){return{isPreloaded:o,isRemovalPrevented:n,routeNames:s.routeNames,preload:o=>t({type:'PRELOAD',payload:{name:o}})}}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"createBaseTabProps",{enumerable:!0,get:function(){return t}})},1295,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(function(t,o){for(var n in o)Object.defineProperty(t,n,{enumerable:!0,get:Object.getOwnPropertyDescriptor(o,n).get})})(e,{get BottomTabBar(){return n.BottomTabBar},get BottomTabBarHeightCallbackContext(){return n.BottomTabBarHeightCallbackContext},get BottomTabBarHeightContext(){return n.BottomTabBarHeightContext},get BottomTabView(){return n.BottomTabView},get SceneStyleInterpolators(){return u},get Tabs(){return n.default},get TransitionPresets(){return c},get TransitionSpecs(){return f},get createJSTabsProps(){return n.createJSTabsProps},get createStandardBottomTabNavigator(){return n.createStandardBottomTabNavigator},get default(){return s},get useBottomTabBarHeight(){return n.useBottomTabBarHeight}});const t=r(d[0]),o=r(d[1]),n=b(r(d[2])),u=b(r(d[3])),c=b(r(d[4])),f=b(r(d[5]));function l(t){if("function"!=typeof WeakMap)return null;var o=new WeakMap,n=new WeakMap;return(l=function(t){return t?n:o})(t)}function b(t,o){if(!o&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var n=l(o);if(n&&n.has(t))return n.get(t);var u={__proto__:null},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in t)if("default"!==f&&Object.prototype.hasOwnProperty.call(t,f)){var b=c?Object.getOwnPropertyDescriptor(t,f):null;b&&(b.get||b.set)?Object.defineProperty(u,f,b):u[f]=t[f]}return u.default=t,n&&n.set(t,u),u}n.default.Screen=o.Screen,n.default.Protected=t.Protected;const s=n.default},1296,[691,692,1297,527,528,529]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(){const n=r(d[0]);return t=function(){return n},n}function n(){const t=r(d[1]);return n=function(){return t},t}Object.defineProperty(e,"__esModule",{value:!0}),(function(t,n){for(var o in n)Object.defineProperty(t,o,{enumerable:!0,get:Object.getOwnPropertyDescriptor(n,o).get})})(e,{get createJSTabsProps(){return h},get default(){return y}});const o=r(d[2]),s=r(d[3]),c=r(d[4]),u=r(d[5]),p=r(d[6]),f=r(d[7]);var l,b;function h(t){const{dispatch:n,state:o}=t;return{...(0,f.createBaseTabProps)(t),popNestedStackToTop:t=>{const s=o.routes.find(n=>n.key===t)?.state;s?.key&&n({...c.StackActions.popToTop(),target:s.key})}}}l=r(d[8]),b=e,Object.keys(l).forEach(function(t){"default"===t||Object.prototype.hasOwnProperty.call(b,t)||Object.defineProperty(b,t,{enumerable:!0,get:function(){return l[t]}})});const y=(0,u.integrateWithRouter)(s.createStandardBottomTabNavigator,c.TabRouter,{activityDefaultThreshold:1,processDescriptors:p.appendMissingPlaceholderTabDescriptors,processState:p.appendMissingPlaceholderTabRoutes,createProps:h,processScreens:s=>s.map(s=>{if('function'!=typeof s.options&&void 0!==s.options?.href){const{href:c,...u}=s.options;if(u.tabBarButton)throw new Error('Cannot use `href` and `tabBarButton` together.');return null===c?{...s,options:{...u,hidden:!0}}:{...s,options:{...u,tabBarButton:s=>{const u='web'===n().Platform.OS?s.children:(0,t().jsx)(n().Pressable,{children:s.children});return(0,t().jsx)(o.Link,{...s,style:[{display:'flex'},s.style],href:c,asChild:'web'!==n().Platform.OS,children:u})}}}}return s})})},1297,[6,15,489,606,408,684,1298,1295,526]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(t,n,o){const s=n.routeNames.filter(t=>!n.routes.some(n=>n.name===t));if(0===s.length)return t;const u=s.reduce((t,n)=>(t[n]=o({key:void 0,name:n}),t),{});return{...t,...u}}function n(t,n){if(!t.routeNames.some(n=>!t.routes.some(t=>t.name===n)))return t;const s=t.routes[t.index]?.key,u=t.routeNames.map(s=>{const u=t.routes.find(t=>t.name===s);return u||o(s,n)}),c=Math.max(0,u.findIndex(t=>t.key===s));return{...t,index:c,routes:u}}function o(t,n){const o=n[t];if(!o)throw new Error(`Could not find a descriptor for route "${t}". This is most likely a bug in expo-router. Please report it at https://github.com/expo/expo/issues.`);return{...o.route,key:t,name:t}}Object.defineProperty(e,"__esModule",{value:!0}),(function(t,n){for(var o in n)Object.defineProperty(t,o,{enumerable:!0,get:Object.getOwnPropertyDescriptor(n,o).get})})(e,{get appendMissingPlaceholderTabDescriptors(){return t},get appendMissingPlaceholderTabRoutes(){return n}})},1298,[]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(){const n=r(d[0]);return t=function(){return n},n}Object.defineProperty(e,"__esModule",{value:!0}),(function(t,n){for(var u in n)Object.defineProperty(t,u,{enumerable:!0,get:Object.getOwnPropertyDescriptor(n,u).get})})(e,{get ExperimentalStack(){return c},get default(){return o}});const n=u(r(d[1]));function u(t){return t&&t.__esModule?t:{default:t}}const c=Object.assign(u=>(0,t().jsx)(n.default,{...u}),{Screen:n.default.Screen,Protected:n.default.Protected}),o=c},1299,[6,1300]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),(function(t,u){for(var n in u)Object.defineProperty(t,n,{enumerable:!0,get:Object.getOwnPropertyDescriptor(u,n).get})})(e,{get Stack(){return t.default},get default(){return l}});const t=c(r(d[0])),u=r(d[1]),n=r(d[2]);function c(t){return t&&t.__esModule?t:{default:t}}t.default.Screen=u.StackScreen,t.default.Header=u.StackHeader,t.default.Title=u.StackTitle,t.default.Toolbar=n.StackToolbar;const l=t.default},1300,[668,701,706]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}});const t=o((n=r(d[0]),u=e,Object.keys(n).forEach(function(t){"default"===t||Object.prototype.hasOwnProperty.call(u,t)||Object.defineProperty(u,t,{enumerable:!0,get:function(){return n[t]}})}),n));var n,u;function o(t){return t&&t.__esModule?t:{default:t}}},1301,[1300]);
__d(function(g,r,i,a,m,e,d){"use strict";var t,n;Object.defineProperty(e,"__esModule",{value:!0}),(function(t,n){for(var o in n)Object.defineProperty(t,o,{enumerable:!0,get:Object.getOwnPropertyDescriptor(n,o).get})})(e,{get useIsPreview(){return s.useIsPreview},get usePreventZoomTransitionDismissal(){return o.usePreventZoomTransitionDismissal}}),t=r(d[0]),n=e,Object.keys(t).forEach(function(o){"default"===o||Object.prototype.hasOwnProperty.call(n,o)||Object.defineProperty(n,o,{enumerable:!0,get:function(){return t[o]}})});const o=r(d[1]),s=r(d[2])},1302,[489,1303,404]);
__d(function(g,r,i,a,m,e,d){"use strict";function n(n){}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"usePreventZoomTransitionDismissal",{enumerable:!0,get:function(){return n}})},1303,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"Color",{enumerable:!0,get:function(){return y}});r(d[0]);function t(t,n){return Object.keys(t).forEach(function(u){"default"===u||Object.prototype.hasOwnProperty.call(n,u)||Object.defineProperty(n,u,{enumerable:!0,get:function(){return t[u]}})}),t}t(r(d[1]),e),t(r(d[2]),e),t(r(d[3]),e),t(r(d[4]),e),t(r(d[5]),e);const n=new Proxy({},{get:(t,n)=>null}),u=new Proxy({},{get:(t,n)=>null}),o=new Proxy({},{get:(t,n)=>null}),l=new Proxy({},{get:(t,n)=>null}),c=new Proxy({get attr(){return u},get material(){return o},get dynamic(){return l}},{get:(t,n)=>n in t?t[n]:null}),y={get ios(){return n},get android(){return c}}},1304,[1305,1306,1307,1308,1309,1310]);
__d(function(g,r,i,a,m,e,d){"use strict";function t(t){return null}function n(t){return null}Object.defineProperty(e,"__esModule",{value:!0}),(function(t,n){for(var o in n)Object.defineProperty(t,o,{enumerable:!0,get:Object.getOwnPropertyDescriptor(n,o).get})})(e,{get Material3Color(){return n},get Material3DynamicColor(){return t}})},1305,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},1306,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},1307,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},1308,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},1309,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,"__esModule",{value:!0})},1310,[]);
__d(function(g,r,i,a,m,e,d){
/**
   * @license React
   * react-compiler-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
"use strict";var _=r(d[0]).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;e.c=function(N){return _.H.useMemoCache(N)}},1311,[12]);
__d(function(g,r,_i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return i}});var e,t=r(d[0]);const o=((e=t)&&e.__esModule?e:{default:e}).default.bind({concatArrays:!0,ignoreUndefined:!0});function n(e,t){const n=window.localStorage.getItem(e);if(n){const l=JSON.parse(n),c=JSON.parse(t),s=JSON.stringify(o(l,c));window.localStorage.setItem(e,s)}else window.localStorage.setItem(e,t)}function l(e,t){return new Promise((o,n)=>{try{const n=e();t?.(null,n),o(n)}catch(e){t?.(e),n(e)}})}function c(e,t,o){return Promise.all(e).then(e=>{const n=o?.(e)??null;return t?.(null,n),Promise.resolve(n)},e=>(t?.(e),Promise.reject(e)))}const s={getItem:(e,t)=>l(()=>window.localStorage.getItem(e),t),setItem:(e,t,o)=>l(()=>window.localStorage.setItem(e,t),o),removeItem:(e,t)=>l(()=>window.localStorage.removeItem(e),t),mergeItem:(e,t,o)=>l(()=>n(e,t),o),clear:e=>l(()=>window.localStorage.clear(),e),getAllKeys:e=>l(()=>{const e=window.localStorage.length,t=[];for(let o=0;o<e;o+=1){const e=window.localStorage.key(o)||"";t.push(e)}return t},e),flushGetRequests:()=>{},multiGet:(e,t)=>c(e.map(e=>s.getItem(e)),t,t=>t.map((t,o)=>[e[o],t])),multiSet:(e,t)=>c(e.map(e=>s.setItem(e[0],e[1])),t),multiRemove:(e,t)=>c(e.map(e=>s.removeItem(e)),t),multiMerge:(e,t)=>c(e.map(e=>s.mergeItem(e[0],e[1])),t)};var i=s},1312,[1313]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return u}});var e,t=r(d[0]),u=((e=t)&&e.__esModule?e:{default:e}).default},1313,[1314]);
__d(function(g,r,i,a,m,e,d){'use strict';const t=r(d[0]),{hasOwnProperty:n}=Object.prototype,{propertyIsEnumerable:o}=Object,c=(t,n,o)=>Object.defineProperty(t,n,{value:o,writable:!0,enumerable:!0,configurable:!0}),s=this,f={concatArrays:!1,ignoreUndefined:!1},l=t=>{const c=[];for(const o in t)n.call(t,o)&&c.push(o);if(Object.getOwnPropertySymbols){const n=Object.getOwnPropertySymbols(t);for(const s of n)o.call(t,s)&&c.push(s)}return c};function u(n){return Array.isArray(n)?y(n):t(n)?p(n):n}function y(t){const n=t.slice(0,0);return l(t).forEach(o=>{c(n,o,u(t[o]))}),n}function p(t){const n=null===Object.getPrototypeOf(t)?Object.create(null):{};return l(t).forEach(o=>{c(n,o,u(t[o]))}),n}const b=(t,n,o,s)=>(o.forEach(o=>{void 0===n[o]&&s.ignoreUndefined||(o in t&&t[o]!==Object.getPrototypeOf(t)?c(t,o,h(t[o],n[o],s)):c(t,o,u(n[o])))}),t),O=(t,o,s)=>{let f=t.slice(0,0),y=0;return[t,o].forEach(o=>{const p=[];for(let s=0;s<o.length;s++)n.call(o,s)&&(p.push(String(s)),c(f,y++,o===t?o[s]:u(o[s])));f=b(f,o,l(o).filter(t=>!p.includes(t)),s)}),f};function h(n,o,c){return c.concatArrays&&Array.isArray(n)&&Array.isArray(o)?O(n,o,c):t(o)&&t(n)?b(n,o,l(o),c):u(o)}m.exports=function(...n){const o=h(u(f),this!==s&&this||{},f);let c={_:{}};for(const s of n)if(void 0!==s){if(!t(s))throw new TypeError('`'+s+'` is not an Option Object');c=h(c,{_:s},o)}return c._}},1314,[1315]);
__d(function(g,r,i,a,m,e,d){'use strict';m.exports=t=>{if('[object Object]'!==Object.prototype.toString.call(t))return!1;const o=Object.getPrototypeOf(t);return null===o||o===Object.prototype}},1315,[]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.useAsyncStorage=function(e){return{getItem:(...t)=>u.default.getItem(e,...t),setItem:(...t)=>u.default.setItem(e,...t),mergeItem:(...t)=>u.default.mergeItem(e,...t),removeItem:(...t)=>u.default.removeItem(e,...t)}};var e,t=r(d[0]),u=(e=t)&&e.__esModule?e:{default:e}},1316,[1312]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0});var t=r(d[0]);Object.keys(t).forEach(function(n){'default'===n||Object.prototype.hasOwnProperty.call(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})});
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
(0,t.registerVersion)("firebase","12.7.0",'app')},1317,[1318]);
__d(function(g,r,_i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"FirebaseError",{enumerable:!0,get:function(){return n.FirebaseError}}),Object.defineProperty(_e,"SDK_VERSION",{enumerable:!0,get:function(){return ie}}),Object.defineProperty(_e,"_DEFAULT_ENTRY_NAME",{enumerable:!0,get:function(){return H}}),Object.defineProperty(_e,"_addComponent",{enumerable:!0,get:function(){return V}}),Object.defineProperty(_e,"_addOrOverwriteComponent",{enumerable:!0,get:function(){return W}}),Object.defineProperty(_e,"_apps",{enumerable:!0,get:function(){return L}}),Object.defineProperty(_e,"_clearComponents",{enumerable:!0,get:function(){return Z}}),Object.defineProperty(_e,"_components",{enumerable:!0,get:function(){return J}}),Object.defineProperty(_e,"_getProvider",{enumerable:!0,get:function(){return K}}),Object.defineProperty(_e,"_isFirebaseApp",{enumerable:!0,get:function(){return G}}),Object.defineProperty(_e,"_isFirebaseServerApp",{enumerable:!0,get:function(){return X}}),Object.defineProperty(_e,"_isFirebaseServerAppSettings",{enumerable:!0,get:function(){return Q}}),Object.defineProperty(_e,"_registerComponent",{enumerable:!0,get:function(){return q}}),Object.defineProperty(_e,"_removeServiceInstance",{enumerable:!0,get:function(){return Y}}),Object.defineProperty(_e,"_serverApps",{enumerable:!0,get:function(){return U}}),Object.defineProperty(_e,"deleteApp",{enumerable:!0,get:function(){return fe}}),Object.defineProperty(_e,"getApp",{enumerable:!0,get:function(){return ce}}),Object.defineProperty(_e,"getApps",{enumerable:!0,get:function(){return pe}}),Object.defineProperty(_e,"initializeApp",{enumerable:!0,get:function(){return oe}}),Object.defineProperty(_e,"initializeServerApp",{enumerable:!0,get:function(){return se}}),Object.defineProperty(_e,"onLog",{enumerable:!0,get:function(){return he}}),Object.defineProperty(_e,"registerVersion",{enumerable:!0,get:function(){return le}}),Object.defineProperty(_e,"setLogLevel",{enumerable:!0,get:function(){return ue}});var e=r(d[0]),t=r(d[1]),n=r(d[2]),i=r(d[3]);
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class o{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(s(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(' ')}}function s(e){const t=e.getComponent();return"VERSION"===t?.type}const c="@firebase/app",p="0.14.6",f=new t.Logger('@firebase/app'),l="@firebase/app-compat",h="@firebase/analytics-compat",u="@firebase/analytics",b="@firebase/app-check-compat",v="@firebase/app-check",C="@firebase/auth",_="@firebase/auth-compat",y="@firebase/database",w="@firebase/data-connect",D="@firebase/database-compat",O="@firebase/functions",E="@firebase/functions-compat",P="@firebase/installations",S="@firebase/installations-compat",j="@firebase/messaging",A="@firebase/messaging-compat",I="@firebase/performance",k="@firebase/performance-compat",F="@firebase/remote-config",$="@firebase/remote-config-compat",N="@firebase/storage",x="@firebase/storage-compat",R="@firebase/firestore",T="@firebase/ai",B="@firebase/firestore-compat",z="firebase",H='[DEFAULT]',M={[c]:'fire-core',[l]:'fire-core-compat',[u]:'fire-analytics',[h]:'fire-analytics-compat',[v]:'fire-app-check',[b]:'fire-app-check-compat',[C]:'fire-auth',[_]:'fire-auth-compat',[y]:'fire-rtdb',[w]:'fire-data-connect',[D]:'fire-rtdb-compat',[O]:'fire-fn',[E]:'fire-fn-compat',[P]:'fire-iid',[S]:'fire-iid-compat',[j]:'fire-fcm',[A]:'fire-fcm-compat',[I]:'fire-perf',[k]:'fire-perf-compat',[F]:'fire-rc',[$]:'fire-rc-compat',[N]:'fire-gcs',[x]:'fire-gcs-compat',[R]:'fire-fst',[B]:'fire-fst-compat',[T]:'fire-vertex','fire-js':'fire-js',[z]:'fire-js-all'},L=new Map,U=new Map,J=new Map;function V(e,t){try{e.container.addComponent(t)}catch(n){f.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function W(e,t){e.container.addOrOverwriteComponent(t)}function q(e){const t=e.name;if(J.has(t))return f.debug(`There were multiple attempts to register component ${t}.`),!1;J.set(t,e);for(const t of L.values())V(t,e);for(const t of U.values())V(t,e);return!0}function K(e,t){const n=e.container.getProvider('heartbeat').getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Y(e,t,n=H){K(e,t).clearInstance(n)}function G(e){return void 0!==e.options}function Q(e){return!G(e)&&('authIdToken'in e||'appCheckToken'in e||'releaseOnDeref'in e||'automaticDataCollectionEnabled'in e)}function X(e){return null!=e&&void 0!==e.settings}function Z(){J.clear()}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ee={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":'Firebase Server App has been deleted',"no-options":'Need to provide options, when not being deployed to hosting via source.',"invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":'First argument to `onLog` must be null or a function.',"idb-open":'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',"idb-get":'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',"idb-set":'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',"idb-delete":'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',"finalization-registry-not-supported":'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',"invalid-server-app-environment":'FirebaseServerApp is not for use in browser environments.'},te=new n.ErrorFactory('app','Firebase',ee);
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class re{constructor(t,n,i){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new e.Component('app',()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw te.create("app-deleted",{appName:this._name})}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ae(e,t){const i=(0,n.base64Decode)(e.split('.')[1]);if(null===i)return void console.error(`FirebaseServerApp ${t} is invalid: second part could not be parsed.`);if(void 0===JSON.parse(i).exp)return void console.error(`FirebaseServerApp ${t} is invalid: expiration claim could not be parsed`);1e3*JSON.parse(i).exp-(new Date).getTime()<=0&&console.error(`FirebaseServerApp ${t} is invalid: the token has expired.`)}class ne extends re{constructor(e,t,n,i){const o=void 0===t.automaticDataCollectionEnabled||t.automaticDataCollectionEnabled,s={name:n,automaticDataCollectionEnabled:o};if(void 0!==e.apiKey)super(e,s,i);else{super(e.options,s,i)}this._serverConfig={automaticDataCollectionEnabled:o,...t},this._serverConfig.authIdToken&&ae(this._serverConfig.authIdToken,'authIdToken'),this._serverConfig.appCheckToken&&ae(this._serverConfig.appCheckToken,'appCheckToken'),this._finalizationRegistry=null,'undefined'!=typeof FinalizationRegistry&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,le(c,p,'serverapp')}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,void 0!==e&&null!==this._finalizationRegistry&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){fe(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw te.create("server-app-deleted")}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ie="12.6.0";function oe(t,i={}){let o=t;if('object'!=typeof i){i={name:i}}const s={name:H,automaticDataCollectionEnabled:!0,...i},c=s.name;if('string'!=typeof c||!c)throw te.create("bad-app-name",{appName:String(c)});if(o||(o=(0,n.getDefaultAppConfig)()),!o)throw te.create("no-options");const p=L.get(c);if(p){if((0,n.deepEqual)(o,p.options)&&(0,n.deepEqual)(s,p.config))return p;throw te.create("duplicate-app",{appName:c})}const f=new e.ComponentContainer(c);for(const e of J.values())f.addComponent(e);const l=new re(o,s,f);return L.set(c,l),l}function se(t,i={}){if((0,n.isBrowser)()&&!(0,n.isWebWorker)())throw te.create("invalid-server-app-environment");let o,s=i||{};if(t&&(G(t)?o=t.options:Q(t)?s=t:o=t),void 0===s.automaticDataCollectionEnabled&&(s.automaticDataCollectionEnabled=!0),o||(o=(0,n.getDefaultAppConfig)()),!o)throw te.create("no-options");const c={...s,...o};void 0!==c.releaseOnDeref&&delete c.releaseOnDeref;if(void 0!==s.releaseOnDeref&&'undefined'==typeof FinalizationRegistry)throw te.create("finalization-registry-not-supported",{});const p=''+(f=JSON.stringify(c),[...f].reduce((e,t)=>Math.imul(31,e)+t.charCodeAt(0)|0,0));var f;const l=U.get(p);if(l)return l.incRefCount(s.releaseOnDeref),l;const h=new e.ComponentContainer(p);for(const e of J.values())h.addComponent(e);const u=new ne(o,s,p,h);return U.set(p,u),u}function ce(e=H){const t=L.get(e);if(!t&&e===H&&(0,n.getDefaultAppConfig)())return oe();if(!t)throw te.create("no-app",{appName:e});return t}function pe(){return Array.from(L.values())}async function fe(e){let t=!1;const n=e.name;if(L.has(n))t=!0,L.delete(n);else if(U.has(n)){e.decRefCount()<=0&&(U.delete(n),t=!0)}t&&(await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function le(t,n,i){let o=M[t]??t;i&&(o+=`-${i}`);const s=o.match(/\s|\//),c=n.match(/\s|\//);if(s||c){const e=[`Unable to register library "${o}" with version "${n}":`];return s&&e.push(`library name "${o}" contains illegal characters (whitespace or "/")`),s&&c&&e.push('and'),c&&e.push(`version name "${n}" contains illegal characters (whitespace or "/")`),void f.warn(e.join(' '))}q(new e.Component(`${o}-version`,()=>({library:o,version:n}),"VERSION"))}function he(e,n){if(null!==e&&'function'!=typeof e)throw te.create("invalid-log-argument");(0,t.setUserLogHandler)(e,n)}function ue(e){(0,t.setLogLevel)(e)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const de='firebase-heartbeat-store';let be=null;function ge(){return be||(be=(0,i.openDB)("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(de)}catch(e){console.warn(e)}}}).catch(e=>{throw te.create("idb-open",{originalErrorMessage:e.message})})),be}async function me(e){try{const t=(await ge()).transaction(de),n=await t.objectStore(de).get(Ce(e));return await t.done,n}catch(e){if(e instanceof n.FirebaseError)f.warn(e.message);else{const t=te.create("idb-get",{originalErrorMessage:e?.message});f.warn(t.message)}}}async function ve(e,t){try{const n=(await ge()).transaction(de,'readwrite'),i=n.objectStore(de);await i.put(t,Ce(e)),await n.done}catch(e){if(e instanceof n.FirebaseError)f.warn(e.message);else{const t=te.create("idb-set",{originalErrorMessage:e?.message});f.warn(t.message)}}}function Ce(e){return`${e.name}!${e.options.appId}`}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ye{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider('app').getImmediate();this._storage=new Oe(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider('platform-logger').getImmediate().getPlatformInfoString(),t=we();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=Pe(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){f.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return'';const e=we(),{heartbeatsToSend:t,unsentEntries:i}=De(this._heartbeatsCache.heartbeats),o=(0,n.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return f.warn(e),''}}}function we(){return(new Date).toISOString().substring(0,10)}function De(e,t=1024){const n=[];let i=e.slice();for(const o of e){const e=n.find(e=>e.agent===o.agent);if(e){if(e.dates.push(o.date),Ee(n)>t){e.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),Ee(n)>t){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Oe{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,n.isIndexedDBAvailable)()&&(0,n.validateIndexedDBOpenable)().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await me(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return ve(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return ve(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ee(e){return(0,n.base64urlEncodeWithoutPadding)(JSON.stringify({version:2,heartbeats:e})).length}function Pe(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let i=1;i<e.length;i++)e[i].date<n&&(n=e[i].date,t=i);return t}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var Se;Se='',q(new e.Component('platform-logger',e=>new o(e),"PRIVATE")),q(new e.Component('heartbeat',e=>new ye(e),"PRIVATE")),le(c,p,Se),le(c,p,'esm2020'),le('fire-js','')},1318,[1319,1322,1320,1323]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"Component",{enumerable:!0,get:function(){return t}}),Object.defineProperty(_e,"ComponentContainer",{enumerable:!0,get:function(){return c}}),Object.defineProperty(_e,"Provider",{enumerable:!0,get:function(){return s}});var e=r(d[0]);class t{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const n='[DEFAULT]';
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class s{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const t=new e.Deferred;if(this.instancesDeferred.set(n,t),this.isInitialized(n)||this.shouldAutoInitialize())try{const e=this.getOrInitializeService({instanceIdentifier:n});e&&t.resolve(e)}catch(e){}}return this.instancesDeferred.get(n).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(o(e))try{this.getOrInitializeService({instanceIdentifier:n})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>'INTERNAL'in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>'_delete'in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=n){return this.instances.has(e)}getOptions(e=n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const o=this.instances.get(n);return o&&e(o,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:(o=e,o===n?void 0:o),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}var o;return s||null}normalizeInstanceIdentifier(e=n){return this.component?this.component.multipleInstances?e:n:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function o(e){return"EAGER"===e.instantiationMode}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class c{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new s(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},1319,[1320]);
__d(function(g,r,_i,_a,m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"CONSTANTS",{enumerable:!0,get:function(){return t}}),Object.defineProperty(_e,"DecodeBase64StringError",{enumerable:!0,get:function(){return u}}),Object.defineProperty(_e,"Deferred",{enumerable:!0,get:function(){return P}}),Object.defineProperty(_e,"ErrorFactory",{enumerable:!0,get:function(){return X}}),Object.defineProperty(_e,"FirebaseError",{enumerable:!0,get:function(){return Q}}),Object.defineProperty(_e,"MAX_VALUE_MILLIS",{enumerable:!0,get:function(){return xe}}),Object.defineProperty(_e,"RANDOM_FACTOR",{enumerable:!0,get:function(){return Be}}),Object.defineProperty(_e,"Sha1",{enumerable:!0,get:function(){return me}}),Object.defineProperty(_e,"areCookiesEnabled",{enumerable:!0,get:function(){return K}}),Object.defineProperty(_e,"assert",{enumerable:!0,get:function(){return n}}),Object.defineProperty(_e,"assertionError",{enumerable:!0,get:function(){return o}}),Object.defineProperty(_e,"async",{enumerable:!0,get:function(){return Ce}}),Object.defineProperty(_e,"base64",{enumerable:!0,get:function(){return c}}),Object.defineProperty(_e,"base64Decode",{enumerable:!0,get:function(){return l}}),Object.defineProperty(_e,"base64Encode",{enumerable:!0,get:function(){return a}}),Object.defineProperty(_e,"base64urlEncodeWithoutPadding",{enumerable:!0,get:function(){return f}}),Object.defineProperty(_e,"calculateBackoffMillis",{enumerable:!0,get:function(){return Ie}}),Object.defineProperty(_e,"contains",{enumerable:!0,get:function(){return ue}}),Object.defineProperty(_e,"createMockUserToken",{enumerable:!0,get:function(){return w}}),Object.defineProperty(_e,"createSubscribe",{enumerable:!0,get:function(){return Oe}}),Object.defineProperty(_e,"decode",{enumerable:!0,get:function(){return ne}}),Object.defineProperty(_e,"deepCopy",{enumerable:!0,get:function(){return d}}),Object.defineProperty(_e,"deepEqual",{enumerable:!0,get:function(){return de}}),Object.defineProperty(_e,"deepExtend",{enumerable:!0,get:function(){return h}}),Object.defineProperty(_e,"errorPrefix",{enumerable:!0,get:function(){return Ae}}),Object.defineProperty(_e,"extractQuerystring",{enumerable:!0,get:function(){return ye}}),Object.defineProperty(_e,"getDefaultAppConfig",{enumerable:!0,get:function(){return j}}),Object.defineProperty(_e,"getDefaultEmulatorHost",{enumerable:!0,get:function(){return E}}),Object.defineProperty(_e,"getDefaultEmulatorHostnameAndPort",{enumerable:!0,get:function(){return C}}),Object.defineProperty(_e,"getDefaults",{enumerable:!0,get:function(){return O}}),Object.defineProperty(_e,"getExperimentalSetting",{enumerable:!0,get:function(){return v}}),Object.defineProperty(_e,"getGlobal",{enumerable:!0,get:function(){return p}}),Object.defineProperty(_e,"getModularInstance",{enumerable:!0,get:function(){return Re}}),Object.defineProperty(_e,"getUA",{enumerable:!0,get:function(){return x}}),Object.defineProperty(_e,"isAdmin",{enumerable:!0,get:function(){return ce}}),Object.defineProperty(_e,"isBrowser",{enumerable:!0,get:function(){return L}}),Object.defineProperty(_e,"isBrowserExtension",{enumerable:!0,get:function(){return V}}),Object.defineProperty(_e,"isCloudWorkstation",{enumerable:!0,get:function(){return A}}),Object.defineProperty(_e,"isCloudflareWorker",{enumerable:!0,get:function(){return R}}),Object.defineProperty(_e,"isElectron",{enumerable:!0,get:function(){return F}}),Object.defineProperty(_e,"isEmpty",{enumerable:!0,get:function(){return fe}}),Object.defineProperty(_e,"isIE",{enumerable:!0,get:function(){return H}}),Object.defineProperty(_e,"isIndexedDBAvailable",{enumerable:!0,get:function(){return G}}),Object.defineProperty(_e,"isMobileCordova",{enumerable:!0,get:function(){return B}}),Object.defineProperty(_e,"isNode",{enumerable:!0,get:function(){return I}}),Object.defineProperty(_e,"isNodeSdk",{enumerable:!0,get:function(){return z}}),Object.defineProperty(_e,"isReactNative",{enumerable:!0,get:function(){return U}}),Object.defineProperty(_e,"isSafari",{enumerable:!0,get:function(){return J}}),Object.defineProperty(_e,"isSafariOrWebkit",{enumerable:!0,get:function(){return Z}}),Object.defineProperty(_e,"isUWP",{enumerable:!0,get:function(){return $}}),Object.defineProperty(_e,"isValidFormat",{enumerable:!0,get:function(){return se}}),Object.defineProperty(_e,"isValidTimestamp",{enumerable:!0,get:function(){return oe}}),Object.defineProperty(_e,"isWebWorker",{enumerable:!0,get:function(){return W}}),Object.defineProperty(_e,"issuedAtTime",{enumerable:!0,get:function(){return ie}}),Object.defineProperty(_e,"jsonEval",{enumerable:!0,get:function(){return te}}),Object.defineProperty(_e,"map",{enumerable:!0,get:function(){return le}}),Object.defineProperty(_e,"ordinal",{enumerable:!0,get:function(){return Le}}),Object.defineProperty(_e,"pingServer",{enumerable:!0,get:function(){return S}}),Object.defineProperty(_e,"promiseWithTimeout",{enumerable:!0,get:function(){return be}}),Object.defineProperty(_e,"querystring",{enumerable:!0,get:function(){return pe}}),Object.defineProperty(_e,"querystringDecode",{enumerable:!0,get:function(){return ge}}),Object.defineProperty(_e,"safeGet",{enumerable:!0,get:function(){return ae}}),Object.defineProperty(_e,"stringLength",{enumerable:!0,get:function(){return ke}}),Object.defineProperty(_e,"stringToByteArray",{enumerable:!0,get:function(){return Te}}),Object.defineProperty(_e,"stringify",{enumerable:!0,get:function(){return re}}),Object.defineProperty(_e,"updateEmulatorBanner",{enumerable:!0,get:function(){return N}}),Object.defineProperty(_e,"validateArgCount",{enumerable:!0,get:function(){return Pe}}),Object.defineProperty(_e,"validateCallback",{enumerable:!0,get:function(){return we}}),Object.defineProperty(_e,"validateContextObject",{enumerable:!0,get:function(){return De}}),Object.defineProperty(_e,"validateIndexedDBOpenable",{enumerable:!0,get:function(){return q}}),Object.defineProperty(_e,"validateNamespace",{enumerable:!0,get:function(){return Se}});var e=r(_d[0]);
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const t={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:'${JSCORE_VERSION}'},n=function(e,t){if(!e)throw o(t)},o=function(e){return new Error('Firebase Database ('+t.SDK_VERSION+') INTERNAL ASSERT FAILED: '+e)},i=function(e){const t=[];let n=0;for(let o=0;o<e.length;o++){let i=e.charCodeAt(o);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&o+1<e.length&&56320==(64512&e.charCodeAt(o+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++o)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s=function(e){const t=[];let n=0,o=0;for(;n<e.length;){const i=e[n++];if(i<128)t[o++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[o++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[o++]=String.fromCharCode(55296+(s>>10)),t[o++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],c=e[n++];t[o++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&c)}}return t.join('')},c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+'+/='},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+'-_.'},HAS_NATIVE_SUPPORT:'function'==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error('encodeByteArray takes an array as a parameter');this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,o=[];for(let t=0;t<e.length;t+=3){const i=e[t],s=t+1<e.length,c=s?e[t+1]:0,u=t+2<e.length,a=u?e[t+2]:0,f=i>>2,l=(3&i)<<4|c>>4;let d=(15&c)<<2|a>>6,h=63&a;u||(h=64,s||(d=64)),o.push(n[f],n[l],n[d],n[h])}return o.join('')},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,o=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0;++t;const c=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==s||null==c||null==a)throw new u;const f=i<<2|s>>4;if(o.push(f),64!==c){const e=s<<4&240|c>>2;if(o.push(e),64!==a){const e=c<<6&192|a;o.push(e)}}}return o},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class u extends Error{constructor(){super(...arguments),this.name='DecodeBase64StringError'}}const a=function(e){const t=i(e);return c.encodeByteArray(t,!0)},f=function(e){return a(e).replace(/\./g,'')},l=function(e){try{return c.decodeString(e,!0)}catch(e){console.error('base64Decode failed: ',e)}return null};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function d(e){return h(void 0,e)}function h(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&b(n)&&(e[n]=h(e[n],t[n]));return e}function b(e){return'__proto__'!==e}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function p(){if('undefined'!=typeof self)return self;if('undefined'!=typeof window)return window;if(void 0!==g)return g;throw new Error('Unable to locate global object.')}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const y=()=>{if('undefined'==typeof process||void 0===process.env)return;const e=process.env.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},_=()=>{if('undefined'==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&l(e[1]);return t&&JSON.parse(t)},O=()=>{try{return(0,e.getDefaultsFromPostinstall)()||p().__FIREBASE_DEFAULTS__||y()||_()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},E=e=>O()?.emulatorHosts?.[e],C=e=>{const t=E(e);if(!t)return;const n=t.lastIndexOf(':');if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const o=parseInt(t.substring(n+1),10);return'['===t[0]?[t.substring(1,n-1),o]:[t.substring(0,n),o]},j=()=>O()?.config,v=e=>O()?.[`_${e}`];
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class P{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),'function'==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function A(e){try{return(e.startsWith('http://')||e.startsWith('https://')?new URL(e).hostname:e).endsWith('.cloudworkstations.dev')}catch{return!1}}async function S(e){return(await fetch(e,{credentials:'include'})).ok}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function w(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||'demo-project',o=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${n}`,aud:n,iat:o,exp:o+3600,auth_time:o,sub:i,user_id:i,firebase:{sign_in_provider:'custom',identities:{}},...e};return[f(JSON.stringify({alg:'none',type:'JWT'})),f(JSON.stringify(s)),''].join('.')}const D={};function T(){const e={prod:[],emulator:[]};for(const t of Object.keys(D))D[t]?e.emulator.push(t):e.prod.push(t);return e}function k(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement('div'),t.setAttribute('id',e),n=!0),{created:n,element:t}}let M=!1;function N(e,t){if('undefined'==typeof window||'undefined'==typeof document||!A(window.location.host)||D[e]===t||D[e]||M)return;function n(e){return`__firebase__banner__${e}`}D[e]=t;const o='__firebase__banner',i=T().prod.length>0;function s(){const e=document.getElementById(o);e&&e.remove()}function c(e){e.style.display='flex',e.style.background='#7faaf0',e.style.position='fixed',e.style.bottom='5px',e.style.left='5px',e.style.padding='.5em',e.style.borderRadius='5px',e.style.alignItems='center'}function u(e,t){e.setAttribute('width','24'),e.setAttribute('id',t),e.setAttribute('height','24'),e.setAttribute('viewBox','0 0 24 24'),e.setAttribute('fill','none'),e.style.marginLeft='-6px'}function a(){const e=document.createElement('span');return e.style.cursor='pointer',e.style.marginLeft='16px',e.style.fontSize='24px',e.innerHTML=' &times;',e.onclick=()=>{M=!0,s()},e}function f(e,t){e.setAttribute('id',t),e.innerText='Learn more',e.href='https://firebase.google.com/docs/studio/preview-apps#preview-backend',e.setAttribute('target','__blank'),e.style.paddingLeft='5px',e.style.textDecoration='underline'}function l(){const e=k(o),t=n('text'),s=document.getElementById(t)||document.createElement('span'),l=n('learnmore'),d=document.getElementById(l)||document.createElement('a'),h=n('preprendIcon'),b=document.getElementById(h)||document.createElementNS('http://www.w3.org/2000/svg','svg');if(e.created){const t=e.element;c(t),f(d,l);const n=a();u(b,h),t.append(b,s,d,n),document.body.appendChild(t)}i?(s.innerText="Preview backend disconnected.",b.innerHTML="<g clip-path=\"url(#clip0_6013_33858)\">\n<path d=\"M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z\" fill=\"#212121\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_6013_33858\">\n<rect width=\"24\" height=\"24\" fill=\"white\"/>\n</clipPath>\n</defs>"):(b.innerHTML="<g clip-path=\"url(#clip0_6083_34804)\">\n<path d=\"M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z\" fill=\"#212121\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_6083_34804\">\n<rect width=\"24\" height=\"24\" fill=\"white\"/>\n</clipPath>\n</defs>",s.innerText='Preview backend running in this workspace.'),s.setAttribute('id',t)}'loading'===document.readyState?window.addEventListener('DOMContentLoaded',l):l()}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function x(){return'undefined'!=typeof navigator&&'string'==typeof navigator.userAgent?navigator.userAgent:''}function B(){return'undefined'!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(x())}function I(){const e=O()?.forceEnvironment;if('node'===e)return!0;if('browser'===e)return!1;try{return'[object process]'===Object.prototype.toString.call(g.process)}catch(e){return!1}}function L(){return'undefined'!=typeof window||W()}function W(){return'undefined'!=typeof WorkerGlobalScope&&'undefined'!=typeof self&&self instanceof WorkerGlobalScope}function R(){return'undefined'!=typeof navigator&&'Cloudflare-Workers'===navigator.userAgent}function V(){const e='object'==typeof chrome?chrome.runtime:'object'==typeof browser?browser.runtime:void 0;return'object'==typeof e&&void 0!==e.id}function U(){return'object'==typeof navigator&&'ReactNative'===navigator.product}function F(){return x().indexOf('Electron/')>=0}function H(){const e=x();return e.indexOf('MSIE ')>=0||e.indexOf('Trident/')>=0}function $(){return x().indexOf('MSAppHost/')>=0}function z(){return!0===t.NODE_CLIENT||!0===t.NODE_ADMIN}function J(){return!I()&&!!navigator.userAgent&&navigator.userAgent.includes('Safari')&&!navigator.userAgent.includes('Chrome')}function Z(){return!I()&&!!navigator.userAgent&&(navigator.userAgent.includes('Safari')||navigator.userAgent.includes('WebKit'))&&!navigator.userAgent.includes('Chrome')}function G(){try{return'object'==typeof indexedDB}catch(e){return!1}}function q(){return new Promise((e,t)=>{try{let n=!0;const o='validate-browser-context-for-indexeddb-analytics-module',i=self.indexedDB.open(o);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(o),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||'')}}catch(e){t(e)}})}function K(){return!('undefined'==typeof navigator||!navigator.cookieEnabled)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Q extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,Q.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,X.prototype.create)}}class X{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},o=`${this.service}/${e}`,i=this.errors[e],s=i?Y(i,n):'Error',c=`${this.serviceName}: ${s} (${o}).`;return new Q(o,c,n)}}function Y(e,t){return e.replace(ee,(e,n)=>{const o=t[n];return null!=o?String(o):`<${n}?>`})}const ee=/\{\$([^}]+)}/g;
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function te(e){return JSON.parse(e)}function re(e){return JSON.stringify(e)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ne=function(e){let t={},n={},o={},i='';try{const s=e.split('.');t=te(l(s[0])||''),n=te(l(s[1])||''),i=s[2],o=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:o,signature:i}},oe=function(e){const t=ne(e).claims,n=Math.floor((new Date).getTime()/1e3);let o=0,i=0;return'object'==typeof t&&(t.hasOwnProperty('nbf')?o=t.nbf:t.hasOwnProperty('iat')&&(o=t.iat),i=t.hasOwnProperty('exp')?t.exp:o+86400),!!n&&!!o&&!!i&&n>=o&&n<=i},ie=function(e){const t=ne(e).claims;return'object'==typeof t&&t.hasOwnProperty('iat')?t.iat:null},se=function(e){const t=ne(e).claims;return!!t&&'object'==typeof t&&t.hasOwnProperty('iat')},ce=function(e){const t=ne(e).claims;return'object'==typeof t&&!0===t.admin};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function ue(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function ae(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function fe(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function le(e,t,n){const o={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(o[i]=t.call(n,e[i],i,e));return o}function de(e,t){if(e===t)return!0;const n=Object.keys(e),o=Object.keys(t);for(const i of n){if(!o.includes(i))return!1;const n=e[i],s=t[i];if(he(n)&&he(s)){if(!de(n,s))return!1}else if(n!==s)return!1}for(const e of o)if(!n.includes(e))return!1;return!0}function he(e){return null!==e&&'object'==typeof e}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function be(e,t=2e3){const n=new P;return setTimeout(()=>n.reject('timeout!'),t),e.then(n.resolve,n.reject),n.promise}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function pe(e){const t=[];for(const[n,o]of Object.entries(e))Array.isArray(o)?o.forEach(e=>{t.push(encodeURIComponent(n)+'='+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+'='+encodeURIComponent(o));return t.length?'&'+t.join('&'):''}function ge(e){const t={};return e.replace(/^\?/,'').split('&').forEach(e=>{if(e){const[n,o]=e.split('=');t[decodeURIComponent(n)]=decodeURIComponent(o)}}),t}function ye(e){const t=e.indexOf('?');if(!t)return'';const n=e.indexOf('#',t);return e.substring(t,n>0?n:void 0)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class me{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if('string'==typeof e)for(let o=0;o<16;o++)n[o]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let o=0;o<16;o++)n[o]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=4294967295&(t<<1|t>>>31)}let o,i,s=this.chain_[0],c=this.chain_[1],u=this.chain_[2],a=this.chain_[3],f=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(o=a^c&(u^a),i=1518500249):(o=c^u^a,i=1859775393):e<60?(o=c&u|a&(c|u),i=2400959708):(o=c^u^a,i=3395469782);const t=(s<<5|s>>>27)+o+f+i+n[e]&4294967295;f=a,a=u,u=4294967295&(c<<30|c>>>2),c=s,s=t}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+c&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+f&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let o=0;const i=this.buf_;let s=this.inbuf_;for(;o<t;){if(0===s)for(;o<=n;)this.compress_(e,o),o+=this.blockSize;if('string'==typeof e){for(;o<t;)if(i[s]=e.charCodeAt(o),++s,++o,s===this.blockSize){this.compress_(i),s=0;break}}else for(;o<t;)if(i[s]=e[o],++s,++o,s===this.blockSize){this.compress_(i),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let o=24;o>=0;o-=8)e[n]=this.chain_[t]>>o&255,++n;return e}}function Oe(e,t){const n=new Ee(e,t);return n.subscribe.bind(n)}class Ee{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let o;if(void 0===e&&void 0===t&&void 0===n)throw new Error('Missing Observer.');o=je(e,['next','error','complete'])?e:{next:e,error:t,complete:n},void 0===o.next&&(o.next=ve),void 0===o.error&&(o.error=ve),void 0===o.complete&&(o.complete=ve);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch(e){}}),this.observers.push(o),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){'undefined'!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ce(e,t){return(...n)=>{Promise.resolve(!0).then(()=>{e(...n)}).catch(e=>{t&&t(e)})}}function je(e,t){if('object'!=typeof e||null===e)return!1;for(const n of t)if(n in e&&'function'==typeof e[n])return!0;return!1}function ve(){}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Pe=function(e,t,n,o){let i;if(o<t?i='at least '+t:o>n&&(i=0===n?'none':'no more than '+n),i){throw new Error(e+' failed: Was called with '+o+(1===o?' argument.':' arguments.')+' Expects '+i+'.')}};function Ae(e,t){return`${e} failed: ${t} argument `}function Se(e,t,n){if((!n||t)&&'string'!=typeof t)throw new Error(Ae(e,'namespace')+'must be a valid firebase namespace.')}function we(e,t,n,o){if((!o||n)&&'function'!=typeof n)throw new Error(Ae(e,t)+'must be a valid function.')}function De(e,t,n,o){if((!o||n)&&('object'!=typeof n||null===n))throw new Error(Ae(e,t)+'must be a valid context object.')}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Te=function(e){const t=[];let o=0;for(let i=0;i<e.length;i++){let s=e.charCodeAt(i);if(s>=55296&&s<=56319){const t=s-55296;i++,n(i<e.length,'Surrogate pair missing trail surrogate.');s=65536+(t<<10)+(e.charCodeAt(i)-56320)}s<128?t[o++]=s:s<2048?(t[o++]=s>>6|192,t[o++]=63&s|128):s<65536?(t[o++]=s>>12|224,t[o++]=s>>6&63|128,t[o++]=63&s|128):(t[o++]=s>>18|240,t[o++]=s>>12&63|128,t[o++]=s>>6&63|128,t[o++]=63&s|128)}return t},ke=function(e){let t=0;for(let n=0;n<e.length;n++){const o=e.charCodeAt(n);o<128?t++:o<2048?t+=2:o>=55296&&o<=56319?(t+=4,n++):t+=3}return t},Me=1e3,Ne=2,xe=144e5,Be=.5;function Ie(e,t=Me,n=Ne){const o=t*Math.pow(n,e),i=Math.round(Be*o*(Math.random()-.5)*2);return Math.min(xe,o+i)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Le(e){return Number.isFinite(e)?e+We(e):`${e}`}function We(e){const t=(e=Math.abs(e))%100;if(t>=10&&t<=20)return'th';const n=e%10;return 1===n?'st':2===n?'nd':3===n?'rd':'th'}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Re(e){return e&&e._delegate?e._delegate:e}},1320,[1321]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"getDefaultsFromPostinstall",{enumerable:!0,get:function(){return t}});const t=()=>{}},1321,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"LogLevel",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"Logger",{enumerable:!0,get:function(){return h}}),Object.defineProperty(e,"setLogLevel",{enumerable:!0,get:function(){return L}}),Object.defineProperty(e,"setUserLogHandler",{enumerable:!0,get:function(){return f}});
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const t=[];var n;!(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(n||(n={}));const o={debug:n.DEBUG,verbose:n.VERBOSE,info:n.INFO,warn:n.WARN,error:n.ERROR,silent:n.SILENT},l=n.INFO,s={[n.DEBUG]:'log',[n.VERBOSE]:'log',[n.INFO]:'info',[n.WARN]:'warn',[n.ERROR]:'error'},u=(t,n,...o)=>{if(n<t.logLevel)return;const l=(new Date).toISOString(),u=s[n];if(!u)throw new Error(`Attempted to log a message with an invalid logType (value: ${n})`);console[u](`[${l}]  ${t.name}:`,...o)};class h{constructor(n){this.name=n,this._logLevel=l,this._logHandler=u,this._userLogHandler=null,t.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in n))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel='string'==typeof t?o[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if('function'!=typeof t)throw new TypeError('Value assigned to `logHandler` must be a function');this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,n.DEBUG,...t),this._logHandler(this,n.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,n.VERBOSE,...t),this._logHandler(this,n.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,n.INFO,...t),this._logHandler(this,n.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,n.WARN,...t),this._logHandler(this,n.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,n.ERROR,...t),this._logHandler(this,n.ERROR,...t)}}function L(n){t.forEach(t=>{t.setLogLevel(n)})}function f(l,s){for(const u of t){let t=null;s&&s.level&&(t=o[s.level]),u.userLogHandler=null===l?null:(o,s,...u)=>{const h=u.map(t=>{if(null==t)return null;if('string'==typeof t)return t;if('number'==typeof t||'boolean'==typeof t)return t.toString();if(t instanceof Error)return t.message;try{return JSON.stringify(t)}catch(t){return null}}).filter(t=>t).join(' ');s>=(t??o.logLevel)&&l({level:n[s].toLowerCase(),message:h,args:u,type:o.name})}}}},1322,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"unwrap",{enumerable:!0,get:function(){return n.u}}),Object.defineProperty(e,"wrap",{enumerable:!0,get:function(){return n.w}}),Object.defineProperty(e,"deleteDB",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"openDB",{enumerable:!0,get:function(){return t}});var n=r(d[0]);function t(t,o,{blocked:s,upgrade:c,blocking:u,terminated:l}={}){const f=indexedDB.open(t,o),b=(0,n.w)(f);return c&&f.addEventListener('upgradeneeded',t=>{c((0,n.w)(f.result),t.oldVersion,t.newVersion,(0,n.w)(f.transaction),t)}),s&&f.addEventListener('blocked',n=>s(n.oldVersion,n.newVersion,n)),b.then(n=>{l&&n.addEventListener('close',()=>l()),u&&n.addEventListener('versionchange',n=>u(n.oldVersion,n.newVersion,n))}).catch(()=>{}),b}function o(t,{blocked:o}={}){const s=indexedDB.deleteDatabase(t);return o&&s.addEventListener('blocked',n=>o(n.oldVersion,n)),(0,n.w)(s).then(()=>{})}const s=['get','getKey','getAll','getAllKeys','count'],c=['put','add','delete','clear'],u=new Map;function l(n,t){if(!(n instanceof IDBDatabase)||t in n||'string'!=typeof t)return;if(u.get(t))return u.get(t);const o=t.replace(/FromIndex$/,''),l=t!==o,f=c.includes(o);if(!(o in(l?IDBIndex:IDBObjectStore).prototype)||!f&&!s.includes(o))return;const b=async function(n,...t){const s=this.transaction(n,f?'readwrite':'readonly');let c=s.store;return l&&(c=c.index(t.shift())),(await Promise.all([c[o](...t),f&&s.done]))[0]};return u.set(t,b),b}(0,n.r)(n=>({...n,get:(t,o,s)=>l(t,o)||n.get(t,o,s),has:(t,o)=>!!l(t,o)||n.has(t,o)}))},1323,[1324]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"a",{enumerable:!0,get:function(){return p}}),Object.defineProperty(e,"i",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"r",{enumerable:!0,get:function(){return l}}),Object.defineProperty(e,"u",{enumerable:!0,get:function(){return B}}),Object.defineProperty(e,"w",{enumerable:!0,get:function(){return I}});const t=(t,n)=>n.some(n=>t instanceof n);let n,o;const s=new WeakMap,c=new WeakMap,u=new WeakMap,f=new WeakMap,p=new WeakMap;function b(t){const n=new Promise((n,o)=>{const s=()=>{t.removeEventListener('success',c),t.removeEventListener('error',u)},c=()=>{n(I(t.result)),s()},u=()=>{o(t.error),s()};t.addEventListener('success',c),t.addEventListener('error',u)});return n.then(n=>{n instanceof IDBCursor&&s.set(n,t)}).catch(()=>{}),p.set(n,t),n}function v(t){if(c.has(t))return;const n=new Promise((n,o)=>{const s=()=>{t.removeEventListener('complete',c),t.removeEventListener('error',u),t.removeEventListener('abort',u)},c=()=>{n(),s()},u=()=>{o(t.error||new DOMException('AbortError','AbortError')),s()};t.addEventListener('complete',c),t.addEventListener('error',u),t.addEventListener('abort',u)});c.set(t,n)}let D={get(t,n,o){if(t instanceof IDBTransaction){if('done'===n)return c.get(t);if('objectStoreNames'===n)return t.objectStoreNames||u.get(t);if('store'===n)return o.objectStoreNames[1]?void 0:o.objectStore(o.objectStoreNames[0])}return I(t[n])},set:(t,n,o)=>(t[n]=o,!0),has:(t,n)=>t instanceof IDBTransaction&&('done'===n||'store'===n)||n in t};function l(t){D=t(D)}function y(c){return'function'==typeof c?(f=c)!==IDBDatabase.prototype.transaction||'objectStoreNames'in IDBTransaction.prototype?(o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(f)?function(...t){return f.apply(B(this),t),I(s.get(this))}:function(...t){return I(f.apply(B(this),t))}:function(t,...n){const o=f.call(B(this),t,...n);return u.set(o,t.sort?t.sort():[t]),I(o)}:(c instanceof IDBTransaction&&v(c),t(c,n||(n=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(c,D):c);var f}function I(t){if(t instanceof IDBRequest)return b(t);if(f.has(t))return f.get(t);const n=y(t);return n!==t&&(f.set(t,n),p.set(n,t)),n}const B=t=>p.get(t)},1324,[]);
__d(function(e,t,n,r,s,i,o){"use strict";Object.defineProperty(i,'__esModule',{value:!0}),Object.defineProperty(i,"AbstractUserDataWriter",{enumerable:!0,get:function(){return Vf}}),Object.defineProperty(i,"AggregateField",{enumerable:!0,get:function(){return Nd}}),Object.defineProperty(i,"AggregateQuerySnapshot",{enumerable:!0,get:function(){return Cd}}),Object.defineProperty(i,"Bytes",{enumerable:!0,get:function(){return Dd}}),Object.defineProperty(i,"CACHE_SIZE_UNLIMITED",{enumerable:!0,get:function(){return hd}}),Object.defineProperty(i,"CollectionReference",{enumerable:!0,get:function(){return ed}}),Object.defineProperty(i,"DocumentReference",{enumerable:!0,get:function(){return Zh}}),Object.defineProperty(i,"DocumentSnapshot",{enumerable:!0,get:function(){return Kf}}),Object.defineProperty(i,"FieldPath",{enumerable:!0,get:function(){return Ad}}),Object.defineProperty(i,"FieldValue",{enumerable:!0,get:function(){return Pd}}),Object.defineProperty(i,"Firestore",{enumerable:!0,get:function(){return dd}}),Object.defineProperty(i,"FirestoreError",{enumerable:!0,get:function(){return A}}),Object.defineProperty(i,"GeoPoint",{enumerable:!0,get:function(){return Od}}),Object.defineProperty(i,"LoadBundleTask",{enumerable:!0,get:function(){return ld}}),Object.defineProperty(i,"PersistentCacheIndexManager",{enumerable:!0,get:function(){return Gm}}),Object.defineProperty(i,"Query",{enumerable:!0,get:function(){return Xh}}),Object.defineProperty(i,"QueryCompositeFilterConstraint",{enumerable:!0,get:function(){return yf}}),Object.defineProperty(i,"QueryConstraint",{enumerable:!0,get:function(){return ff}}),Object.defineProperty(i,"QueryDocumentSnapshot",{enumerable:!0,get:function(){return Wf}}),Object.defineProperty(i,"QueryEndAtConstraint",{enumerable:!0,get:function(){return Cf}}),Object.defineProperty(i,"QueryFieldFilterConstraint",{enumerable:!0,get:function(){return gf}}),Object.defineProperty(i,"QueryLimitConstraint",{enumerable:!0,get:function(){return _f}}),Object.defineProperty(i,"QueryOrderByConstraint",{enumerable:!0,get:function(){return vf}}),Object.defineProperty(i,"QuerySnapshot",{enumerable:!0,get:function(){return Hf}}),Object.defineProperty(i,"QueryStartAtConstraint",{enumerable:!0,get:function(){return Sf}}),Object.defineProperty(i,"SnapshotMetadata",{enumerable:!0,get:function(){return $f}}),Object.defineProperty(i,"Timestamp",{enumerable:!0,get:function(){return me}}),Object.defineProperty(i,"Transaction",{enumerable:!0,get:function(){return Om}}),Object.defineProperty(i,"VectorValue",{enumerable:!0,get:function(){return Md}}),Object.defineProperty(i,"WriteBatch",{enumerable:!0,get:function(){return Am}}),Object.defineProperty(i,"_AutoId",{enumerable:!0,get:function(){return j}}),Object.defineProperty(i,"_ByteString",{enumerable:!0,get:function(){return Tn}}),Object.defineProperty(i,"_DatabaseId",{enumerable:!0,get:function(){return Fn}}),Object.defineProperty(i,"_DocumentKey",{enumerable:!0,get:function(){return te}}),Object.defineProperty(i,"_EmptyAppCheckTokenProvider",{enumerable:!0,get:function(){return U}}),Object.defineProperty(i,"_EmptyAuthCredentialsProvider",{enumerable:!0,get:function(){return O}}),Object.defineProperty(i,"_FieldPath",{enumerable:!0,get:function(){return ee}}),Object.defineProperty(i,"_TestingHooks",{enumerable:!0,get:function(){return Zm}}),Object.defineProperty(i,"_cast",{enumerable:!0,get:function(){return ue}}),Object.defineProperty(i,"_debugAssert",{enumerable:!0,get:function(){return N}}),Object.defineProperty(i,"_internalAggregationQueryToProtoRunAggregationQueryRequest",{enumerable:!0,get:function(){return Xm}}),Object.defineProperty(i,"_internalQueryToProtoQueryTarget",{enumerable:!0,get:function(){return Ym}}),Object.defineProperty(i,"_isBase64Available",{enumerable:!0,get:function(){return _n}}),Object.defineProperty(i,"_logWarn",{enumerable:!0,get:function(){return _}}),Object.defineProperty(i,"_validateIsNotUsedTogether",{enumerable:!0,get:function(){return re}}),Object.defineProperty(i,"addDoc",{enumerable:!0,get:function(){return cm}}),Object.defineProperty(i,"aggregateFieldEqual",{enumerable:!0,get:function(){return jf}}),Object.defineProperty(i,"aggregateQuerySnapshotEqual",{enumerable:!0,get:function(){return zf}}),Object.defineProperty(i,"and",{enumerable:!0,get:function(){return bf}}),Object.defineProperty(i,"arrayRemove",{enumerable:!0,get:function(){return Lm}}),Object.defineProperty(i,"arrayUnion",{enumerable:!0,get:function(){return Fm}}),Object.defineProperty(i,"average",{enumerable:!0,get:function(){return Uf}}),Object.defineProperty(i,"clearIndexedDbPersistence",{enumerable:!0,get:function(){return vd}}),Object.defineProperty(i,"collection",{enumerable:!0,get:function(){return td}}),Object.defineProperty(i,"collectionGroup",{enumerable:!0,get:function(){return nd}}),Object.defineProperty(i,"connectFirestoreEmulator",{enumerable:!0,get:function(){return Yh}}),Object.defineProperty(i,"count",{enumerable:!0,get:function(){return Bf}}),Object.defineProperty(i,"deleteAllPersistentCacheIndexes",{enumerable:!0,get:function(){return Wm}}),Object.defineProperty(i,"deleteDoc",{enumerable:!0,get:function(){return um}}),Object.defineProperty(i,"deleteField",{enumerable:!0,get:function(){return Rm}}),Object.defineProperty(i,"disableNetwork",{enumerable:!0,get:function(){return Td}}),Object.defineProperty(i,"disablePersistentCacheIndexAutoCreation",{enumerable:!0,get:function(){return Qm}}),Object.defineProperty(i,"doc",{enumerable:!0,get:function(){return rd}}),Object.defineProperty(i,"documentId",{enumerable:!0,get:function(){return kd}}),Object.defineProperty(i,"documentSnapshotFromJSON",{enumerable:!0,get:function(){return Qf}}),Object.defineProperty(i,"enableIndexedDbPersistence",{enumerable:!0,get:function(){return yd}}),Object.defineProperty(i,"enableMultiTabIndexedDbPersistence",{enumerable:!0,get:function(){return wd}}),Object.defineProperty(i,"enableNetwork",{enumerable:!0,get:function(){return _d}}),Object.defineProperty(i,"enablePersistentCacheIndexAutoCreation",{enumerable:!0,get:function(){return Km}}),Object.defineProperty(i,"endAt",{enumerable:!0,get:function(){return Af}}),Object.defineProperty(i,"endBefore",{enumerable:!0,get:function(){return Df}}),Object.defineProperty(i,"ensureFirestoreConfigured",{enumerable:!0,get:function(){return gd}}),Object.defineProperty(i,"executeWrite",{enumerable:!0,get:function(){return fm}}),Object.defineProperty(i,"getAggregateFromServer",{enumerable:!0,get:function(){return pm}}),Object.defineProperty(i,"getCountFromServer",{enumerable:!0,get:function(){return gm}}),Object.defineProperty(i,"getDoc",{enumerable:!0,get:function(){return Zf}}),Object.defineProperty(i,"getDocFromCache",{enumerable:!0,get:function(){return tm}}),Object.defineProperty(i,"getDocFromServer",{enumerable:!0,get:function(){return nm}}),Object.defineProperty(i,"getDocs",{enumerable:!0,get:function(){return rm}}),Object.defineProperty(i,"getDocsFromCache",{enumerable:!0,get:function(){return sm}}),Object.defineProperty(i,"getDocsFromServer",{enumerable:!0,get:function(){return im}}),Object.defineProperty(i,"getFirestore",{enumerable:!0,get:function(){return md}}),Object.defineProperty(i,"getPersistentCacheIndexManager",{enumerable:!0,get:function(){return $m}}),Object.defineProperty(i,"increment",{enumerable:!0,get:function(){return qm}}),Object.defineProperty(i,"initializeFirestore",{enumerable:!0,get:function(){return fd}}),Object.defineProperty(i,"limit",{enumerable:!0,get:function(){return Tf}}),Object.defineProperty(i,"limitToLast",{enumerable:!0,get:function(){return Ef}}),Object.defineProperty(i,"loadBundle",{enumerable:!0,get:function(){return Sd}}),Object.defineProperty(i,"memoryEagerGarbageCollector",{enumerable:!0,get:function(){return Im}}),Object.defineProperty(i,"memoryLocalCache",{enumerable:!0,get:function(){return Tm}}),Object.defineProperty(i,"memoryLruGarbageCollector",{enumerable:!0,get:function(){return _m}}),Object.defineProperty(i,"namedQuery",{enumerable:!0,get:function(){return xd}}),Object.defineProperty(i,"onSnapshot",{enumerable:!0,get:function(){return lm}}),Object.defineProperty(i,"onSnapshotResume",{enumerable:!0,get:function(){return hm}}),Object.defineProperty(i,"onSnapshotsInSync",{enumerable:!0,get:function(){return dm}}),Object.defineProperty(i,"or",{enumerable:!0,get:function(){return wf}}),Object.defineProperty(i,"orderBy",{enumerable:!0,get:function(){return If}}),Object.defineProperty(i,"persistentLocalCache",{enumerable:!0,get:function(){return Em}}),Object.defineProperty(i,"persistentMultipleTabManager",{enumerable:!0,get:function(){return Cm}}),Object.defineProperty(i,"persistentSingleTabManager",{enumerable:!0,get:function(){return Nm}}),Object.defineProperty(i,"query",{enumerable:!0,get:function(){return mf}}),Object.defineProperty(i,"queryEqual",{enumerable:!0,get:function(){return id}}),Object.defineProperty(i,"querySnapshotFromJSON",{enumerable:!0,get:function(){return Jf}}),Object.defineProperty(i,"refEqual",{enumerable:!0,get:function(){return sd}}),Object.defineProperty(i,"runTransaction",{enumerable:!0,get:function(){return Mm}}),Object.defineProperty(i,"serverTimestamp",{enumerable:!0,get:function(){return Vm}}),Object.defineProperty(i,"setDoc",{enumerable:!0,get:function(){return om}}),Object.defineProperty(i,"setIndexConfiguration",{enumerable:!0,get:function(){return jm}}),Object.defineProperty(i,"setLogLevel",{enumerable:!0,get:function(){return b}}),Object.defineProperty(i,"snapshotEqual",{enumerable:!0,get:function(){return Xf}}),Object.defineProperty(i,"startAfter",{enumerable:!0,get:function(){return Nf}}),Object.defineProperty(i,"startAt",{enumerable:!0,get:function(){return xf}}),Object.defineProperty(i,"sum",{enumerable:!0,get:function(){return qf}}),Object.defineProperty(i,"terminate",{enumerable:!0,get:function(){return Ed}}),Object.defineProperty(i,"updateDoc",{enumerable:!0,get:function(){return am}}),Object.defineProperty(i,"vector",{enumerable:!0,get:function(){return Um}}),Object.defineProperty(i,"waitForPendingWrites",{enumerable:!0,get:function(){return Id}}),Object.defineProperty(i,"where",{enumerable:!0,get:function(){return pf}}),Object.defineProperty(i,"writeBatch",{enumerable:!0,get:function(){return Bm}});var a=t(o[0]),u=t(o[1]),c=t(o[2]),l=t(o[3]),h=t(o[4]),d=t(o[5]);const f="@firebase/firestore",m="4.9.3";
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class g{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}g.UNAUTHENTICATED=new g(null),g.GOOGLE_CREDENTIALS=new g("google-credentials-uid"),g.FIRST_PARTY=new g("first-party-uid"),g.MOCK_USER=new g("mock-user");
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
let p="12.7.0";
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const y=new c.Logger("@firebase/firestore");function w(){return y.logLevel}function b(e){y.setLogLevel(e)}function v(e,...t){if(y.logLevel<=c.LogLevel.DEBUG){const n=t.map(T);y.debug(`Firestore (${p}): ${e}`,...n)}}function I(e,...t){if(y.logLevel<=c.LogLevel.ERROR){const n=t.map(T);y.error(`Firestore (${p}): ${e}`,...n)}}function _(e,...t){if(y.logLevel<=c.LogLevel.WARN){const n=t.map(T);y.warn(`Firestore (${p}): ${e}`,...n)}}function T(e){if("string"==typeof e)return e;try{
/**
      * @license
      * Copyright 2020 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */
return(function(e){return JSON.stringify(e)})(e)}catch(t){return e}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function E(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,S(e,r,n)}function S(e,t,n){let r=`FIRESTORE (${p}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw I(r),new Error(r)}function x(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||S(t,s,r)}function N(e,t){e||E(57014,t)}function C(e,t){return e}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class A extends l.FirebaseError{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class k{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class P{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class O{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(g.UNAUTHENTICATED))}shutdown(){}}class M{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class R{constructor(e){this.t=e,this.currentUser=g.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){x(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new k;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new k,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{v("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(v("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new k)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(v("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(x("string"==typeof t.accessToken,31837,{l:t}),new P(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return x(null===e||"string"==typeof e,2055,{h:e}),new g(e)}}class V{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=g.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class F{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new V(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(g.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class L{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class q{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,a._isFirebaseServerApp)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){x(void 0===this.o,3512);const n=e=>{null!=e.error&&v("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,v("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{v("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):v("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new L(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(x("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new L(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class U{getToken(){return Promise.resolve(new L(""))}invalidateToken(){}start(e,t){}shutdown(){}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function B(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class j{static newId(){const e=62*Math.floor(4.129032258064516);let t="";for(;t.length<20;){const n=B(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function z(e,t){return e<t?-1:e>t?1:0}function G(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return Q(n)===Q(s)?z(n,s):Q(n)?1:-1}return z(e.length,t.length)}const $=55296,K=57343;function Q(e){const t=e.charCodeAt(0);return t>=$&&t<=K}function W(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function H(e){return e+"\0"}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const J="__name__";class Y{constructor(e,t,n){void 0===t?t=0:t>e.length&&E(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&E(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Y.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Y?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=Y.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return z(e.length,t.length)}static compareSegments(e,t){const n=Y.isNumericId(e),r=Y.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?Y.extractNumericId(e).compare(Y.extractNumericId(t)):G(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return h.Integer.fromString(e.substring(4,e.length-2))}}class X extends Y{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new A(D.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new X(t)}static emptyPath(){return new X([])}}const Z=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ee extends Y{construct(e,t,n){return new ee(e,t,n)}static isValidIdentifier(e){return Z.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ee.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===J}static keyField(){return new ee([J])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new A(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new A(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new A(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new A(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ee(t)}static emptyPath(){return new ee([])}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class te{constructor(e){this.path=e}static fromPath(e){return new te(X.fromString(e))}static fromName(e){return new te(X.fromString(e).popFirst(5))}static empty(){return new te(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===X.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new te(new X(e.slice()))}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ne(e,t,n){if(!n)throw new A(D.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function re(e,t,n,r){if(!0===t&&!0===r)throw new A(D.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function se(e){if(!te.isDocumentKey(e))throw new A(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ie(e){if(te.isDocumentKey(e))throw new A(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function oe(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function ae(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=(function(e){return e.constructor?e.constructor.name:null})(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":E(12329,{type:typeof e})}function ue(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new A(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ae(e);throw new A(D.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function ce(e,t){if(t<=0)throw new A(D.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function le(e,t){const n={typeString:e};return t&&(n.value=t),n}function he(e,t){if(!oe(e))throw new A(D.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new A(D.INVALID_ARGUMENT,n);return!0}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const de=-62135596800,fe=1e6;class me{static now(){return me.fromMillis(Date.now())}static fromDate(e){return me.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*fe);return new me(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new A(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new A(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<de)throw new A(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new A(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/fe}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(he(e,me._jsonSchema))return new me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-de;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}me._jsonSchemaVersion="firestore/timestamp/1.0",me._jsonSchema={type:le("string",me._jsonSchemaVersion),seconds:le("number"),nanoseconds:le("number")};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class ge{static fromTimestamp(e){return new ge(e)}static min(){return new ge(new me(0,0))}static max(){return new ge(new me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const pe=-1;class ye{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function we(e){return e.fields.find(e=>2===e.kind)}function be(e){return e.fields.filter(e=>2!==e.kind)}function ve(e,t){let n=z(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(n=_e(e.fields[r],t.fields[r]),0!==n)return n;return z(e.fields.length,t.fields.length)}ye.UNKNOWN_ID=-1;class Ie{constructor(e,t){this.fieldPath=e,this.kind=t}}function _e(e,t){const n=ee.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:z(e.kind,t.kind)}class Te{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Te(0,xe.min())}}function Ee(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=ge.fromTimestamp(1e9===r?new me(n+1,0):new me(n,r));return new xe(s,te.empty(),t)}function Se(e){return new xe(e.readTime,e.key,pe)}class xe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new xe(ge.min(),te.empty(),pe)}static max(){return new xe(ge.max(),te.empty(),pe)}}function Ne(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=te.comparator(e.documentKey,t.documentKey),0!==n?n:z(e.largestBatchId,t.largestBatchId)
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */)}const Ce="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class De{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Ae(e){if(e.code!==D.FAILED_PRECONDITION||e.message!==Ce)throw e;v("LocalStore","Unexpectedly lost primary lease")}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ke{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&E(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ke((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof ke?t:ke.resolve(t)}catch(e){return ke.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):ke.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):ke.reject(t)}static resolve(e){return new ke((t,n)=>{t(e)})}static reject(e){return new ke((t,n)=>{n(e)})}static waitFor(e){return new ke((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=ke.resolve(!1);for(const n of e)t=t.next(e=>e?ke.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new ke((n,r)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const u=a;t(e[u]).next(e=>{i[u]=e,++o,o===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new ke((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Pe="SimpleDb";class Oe{static open(e,t,n,r){try{return new Oe(t,e.transaction(r,n))}catch(e){throw new Fe(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new k,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Fe(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{const n=je(t.target.error);this.S.reject(new Fe(e,n))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(v(Pe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new qe(t)}}class Me{static delete(e){return v(Pe,"Removing database:",e),Ue((0,l.getGlobal)().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!(0,l.isIndexedDBAvailable)())return!1;if(Me.F())return!0;const e=(0,l.getUA)(),t=Me.M(e),n=0<t&&t<10,r=Re(e),s=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static F(){return"undefined"!=typeof process&&"YES"===process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,12.2===Me.M((0,l.getUA)())&&I("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(v(Pe,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new Fe(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new A(D.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new A(D.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new Fe(e,r))},r.onupgradeneeded=e=>{v(Pe,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.k(t,r.transaction,e.oldVersion,this.version).next(()=>{v(Pe,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const s="readonly"===t;let i=0;for(;;){++i;try{this.db=await this.L(e);const t=Oe.open(this.db,e,s?"readonly":"readwrite",n),i=r(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),ke.reject(e))).toPromise();return i.catch(()=>{}),await t.D,i}catch(e){const t=e,n="FirebaseError"!==t.name&&i<3;if(v(Pe,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Re(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class Ve{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return Ue(this.U.delete())}}class Fe extends A{constructor(e,t){super(D.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Le(e){return"IndexedDbTransactionError"===e.name}class qe{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(v(Pe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(v(Pe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Ue(n)}add(e){return v(Pe,"ADD",this.store.name,e,e),Ue(this.store.add(e))}get(e){return Ue(this.store.get(e)).next(t=>(void 0===t&&(t=null),v(Pe,"GET",this.store.name,e,t),t))}delete(e){return v(Pe,"DELETE",this.store.name,e),Ue(this.store.delete(e))}count(){return v(Pe,"COUNT",this.store.name),Ue(this.store.count())}J(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new ke((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.H(e,(e,n)=>{t.push(n)}).next(()=>t)}}Y(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new ke((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}Z(e,t){v(Pe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.H(r,t)}te(e){const t=this.cursor({});return new ke((n,r)=>{t.onerror=e=>{const t=je(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){const n=[];return new ke((r,s)=>{e.onerror=e=>{s(e.target.error)},e.onsuccess=e=>{const s=e.target.result;if(!s)return void r();const i=new Ve(s),o=t(s.primaryKey,s.value,i);if(o instanceof ke){const e=o.catch(e=>(i.done(),ke.reject(e)));n.push(e)}i.isDone?r():null===i.G?s.continue():s.continue(i.G)}}).next(()=>ke.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Ue(e){return new ke((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=je(e.target.error);n(t)}})}let Be=!1;function je(e){const t=Me.M((0,l.getUA)());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new A("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Be||(Be=!0,setTimeout(()=>{throw e},0)),e}}return e}const ze="IndexBackfiller";class Ge{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){v(ze,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();v(ze,`Documents written: ${e}`)}catch(e){Le(e)?v(ze,"Ignoring IndexedDB error during index backfill: ",e):await Ae(e)}await this.re(6e4)})}}class $e{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let r=t,s=!0;return ke.doWhile(()=>!0===s&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return v(ze,`Processing collection: ${t}`),this.oe(e,t,r).next(e=>{r-=e,n.add(t)});s=!1})).next(()=>t-r)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const s=n.changes;return this.localStore.indexManager.updateIndexEntries(e,s).next(()=>this._e(r,n)).next(n=>(v(ze,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>s.size)}))}_e(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=Se(t);Ne(r,n)>0&&(n=r)}),new xe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
/**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ke{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ke.ce=-1;
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Qe=-1;function We(e){return null==e}function He(e){return 0===e&&1/e==-1/0}function Je(e){return"number"==typeof e&&Number.isInteger(e)&&!He(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Ye="\x01";function Xe(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=et(t)),t=Ze(e.get(n),t);return et(t)}function Ze(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="\x01\x10";break;case Ye:n+="\x01\x11";break;default:n+=r}}return n}function et(e){return e+Ye+"\x01"}function tt(e){const t=e.length;if(x(t>=2,64408,{path:e}),2===t)return x(e.charAt(0)===Ye&&"\x01"===e.charAt(1),56145,{path:e}),X.emptyPath();const n=t-2,r=[];let s="";for(let i=0;i<t;){const t=e.indexOf(Ye,i);switch((t<0||t>n)&&E(50515,{path:e}),e.charAt(t+1)){case"\x01":const n=e.substring(i,t);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"\x10":s+=e.substring(i,t),s+="\0";break;case"\x11":s+=e.substring(i,t+1);break;default:E(61167,{path:e})}i=t+2}return new X(r)}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const nt="remoteDocuments",rt="owner",st="owner",it="mutationQueues",ot="mutations",at="batchId",ut="userMutationsIndex",ct=["userId","batchId"];
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function lt(e,t){return[e,Xe(t)]}function ht(e,t,n){return[e,Xe(t),n]}const dt={},ft="documentMutations",mt="remoteDocumentsV14",gt=["prefixPath","collectionGroup","readTime","documentId"],pt="documentKeyIndex",yt=["prefixPath","collectionGroup","documentId"],wt="collectionGroupIndex",bt=["collectionGroup","readTime","prefixPath","documentId"],vt="remoteDocumentGlobal",It="remoteDocumentGlobalKey",_t="targets",Tt="queryTargetsIndex",Et=["canonicalId","targetId"],St="targetDocuments",xt=["targetId","path"],Nt="documentTargetsIndex",Ct=["path","targetId"],Dt="targetGlobalKey",At="targetGlobal",kt="collectionParents",Pt=["collectionId","parent"],Ot="clientMetadata",Mt="bundles",Rt="namedQueries",Vt="indexConfiguration",Ft="collectionGroupIndex",Lt="indexState",qt=["indexId","uid"],Ut="sequenceNumberIndex",Bt=["uid","sequenceNumber"],jt="indexEntries",zt=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Gt="documentKeyIndex",$t=["indexId","uid","orderedDocumentKey"],Kt="documentOverlays",Qt=["userId","collectionPath","documentId"],Wt="collectionPathOverlayIndex",Ht=["userId","collectionPath","largestBatchId"],Jt="collectionGroupOverlayIndex",Yt=["userId","collectionGroup","largestBatchId"],Xt="globals",Zt=[it,ot,ft,nt,_t,rt,At,St,Ot,vt,kt,Mt,Rt],en=[...Zt,Kt],tn=[it,ot,ft,mt,_t,rt,At,St,Ot,vt,kt,Mt,Rt,Kt],nn=tn,rn=[...nn,Vt,Lt,jt],sn=rn,on=[...rn,Xt],an=on;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class un extends De{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function cn(e,t){const n=C(e);return Me.O(n.le,t)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ln(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function hn(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function dn(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function fn(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class mn{constructor(e,t){this.comparator=e,this.root=t||pn.EMPTY}insert(e,t){return new mn(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,pn.BLACK,null,null))}remove(e){return new mn(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pn.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new gn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new gn(this.root,e,this.comparator,!1)}getReverseIterator(){return new gn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new gn(this.root,e,this.comparator,!0)}}class gn{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class pn{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:pn.RED,this.left=null!=r?r:pn.EMPTY,this.right=null!=s?s:pn.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new pn(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return pn.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return pn.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pn.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw E(43730,{key:this.key,value:this.value});if(this.right.isRed())throw E(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw E(27949);return e+(this.isRed()?0:1)}}pn.EMPTY=null,pn.RED=!0,pn.BLACK=!1,pn.EMPTY=new class{constructor(){this.size=0}get key(){throw E(57766)}get value(){throw E(16141)}get color(){throw E(16727)}get left(){throw E(29726)}get right(){throw E(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new pn(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class yn{constructor(e){this.comparator=e,this.data=new mn(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wn(this.data.getIterator())}getIteratorFrom(e){return new wn(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof yn))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new yn(this.comparator);return t.data=e,t}}class wn{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function bn(e){return e.hasNext()?e.getNext():void 0}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class vn{constructor(e){this.fields=e,e.sort(ee.comparator)}static empty(){return new vn([])}unionWith(e){let t=new yn(ee.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new vn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return W(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class In extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function _n(){return"undefined"!=typeof atob}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Tn{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new In("Invalid base64 string: "+e):e}})(e);return new Tn(t)}static fromUint8Array(e){const t=(function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t})(e);return new Tn(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return(function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
      * @license
      * Copyright 2020 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */)(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Tn.EMPTY_BYTE_STRING=new Tn("");const En=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Sn(e){if(x(!!e,39018),"string"==typeof e){let t=0;const n=En.exec(e);if(x(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:xn(e.seconds),nanos:xn(e.nanos)}}function xn(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Nn(e){return"string"==typeof e?Tn.fromBase64String(e):Tn.fromUint8Array(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Cn="server_timestamp",Dn="__type__",An="__previous_value__",kn="__local_write_time__";function Pn(e){const t=(e?.mapValue?.fields||{})[Dn]?.stringValue;return t===Cn}function On(e){const t=e.mapValue.fields[An];return Pn(t)?On(t):t}function Mn(e){const t=Sn(e.mapValue.fields[kn].timestampValue);return new me(t.seconds,t.nanos)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Rn{constructor(e,t,n,r,s,i,o,a,u,c){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=u,this.isUsingEmulator=c}}const Vn="(default)";class Fn{constructor(e,t){this.projectId=e,this.database=t||Vn}static empty(){return new Fn("","")}get isDefaultDatabase(){return this.database===Vn}isEqual(e){return e instanceof Fn&&e.projectId===this.projectId&&e.database===this.database}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Ln="__type__",qn="__max__",Un={mapValue:{fields:{__type__:{stringValue:qn}}}},Bn="__vector__",jn="value",zn={nullValue:"NULL_VALUE"};function Gn(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Pn(e)?4:ar(e)?9007199254740991:ir(e)?10:11:E(28295,{value:e})}function $n(e,t){if(e===t)return!0;const n=Gn(e);if(n!==Gn(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Mn(e).isEqual(Mn(t));case 3:return(function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Sn(e.timestampValue),r=Sn(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos})(e,t);case 5:return e.stringValue===t.stringValue;case 6:return(function(e,t){return Nn(e.bytesValue).isEqual(Nn(t.bytesValue))})(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return(function(e,t){return xn(e.geoPointValue.latitude)===xn(t.geoPointValue.latitude)&&xn(e.geoPointValue.longitude)===xn(t.geoPointValue.longitude)})(e,t);case 2:return(function(e,t){if("integerValue"in e&&"integerValue"in t)return xn(e.integerValue)===xn(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=xn(e.doubleValue),r=xn(t.doubleValue);return n===r?He(n)===He(r):isNaN(n)&&isNaN(r)}return!1})(e,t);case 9:return W(e.arrayValue.values||[],t.arrayValue.values||[],$n);case 10:case 11:return(function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ln(n)!==ln(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!$n(n[e],r[e])))return!1;return!0})(e,t);default:return E(52216,{left:e})}}function Kn(e,t){return void 0!==(e.values||[]).find(e=>$n(e,t))}function Qn(e,t){if(e===t)return 0;const n=Gn(e),r=Gn(t);if(n!==r)return z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return z(e.booleanValue,t.booleanValue);case 2:return(function(e,t){const n=xn(e.integerValue||e.doubleValue),r=xn(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1})(e,t);case 3:return Wn(e.timestampValue,t.timestampValue);case 4:return Wn(Mn(e),Mn(t));case 5:return G(e.stringValue,t.stringValue);case 6:return(function(e,t){const n=Nn(e),r=Nn(t);return n.compareTo(r)})(e.bytesValue,t.bytesValue);case 7:return(function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=z(n[e],r[e]);if(0!==t)return t}return z(n.length,r.length)})(e.referenceValue,t.referenceValue);case 8:return(function(e,t){const n=z(xn(e.latitude),xn(t.latitude));return 0!==n?n:z(xn(e.longitude),xn(t.longitude))})(e.geoPointValue,t.geoPointValue);case 9:return Hn(e.arrayValue,t.arrayValue);case 10:return(function(e,t){const n=e.fields||{},r=t.fields||{},s=n[jn]?.arrayValue,i=r[jn]?.arrayValue,o=z(s?.values?.length||0,i?.values?.length||0);return 0!==o?o:Hn(s,i)})(e.mapValue,t.mapValue);case 11:return(function(e,t){if(e===Un.mapValue&&t===Un.mapValue)return 0;if(e===Un.mapValue)return 1;if(t===Un.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let e=0;e<r.length&&e<i.length;++e){const t=G(r[e],i[e]);if(0!==t)return t;const o=Qn(n[r[e]],s[i[e]]);if(0!==o)return o}return z(r.length,i.length)})(e.mapValue,t.mapValue);default:throw E(23264,{he:n})}}function Wn(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return z(e,t);const n=Sn(e),r=Sn(t),s=z(n.seconds,r.seconds);return 0!==s?s:z(n.nanos,r.nanos)}function Hn(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=Qn(n[e],r[e]);if(t)return t}return z(n.length,r.length)}function Jn(e){return Yn(e)}function Yn(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?(function(e){const t=Sn(e);return`time(${t.seconds},${t.nanos})`})(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?(function(e){return Nn(e).toBase64()})(e.bytesValue):"referenceValue"in e?(function(e){return te.fromName(e).toString()})(e.referenceValue):"geoPointValue"in e?(function(e){return`geo(${e.latitude},${e.longitude})`})(e.geoPointValue):"arrayValue"in e?(function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Yn(r);return t+"]"})(e.arrayValue):"mapValue"in e?(function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${Yn(e.fields[s])}`;return n+"}"})(e.mapValue):E(61005,{value:e})}function Xn(e){switch(Gn(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=On(e);return t?16+Xn(t):16;case 5:return 2*e.stringValue.length;case 6:return Nn(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(function(e){return(e.values||[]).reduce((e,t)=>e+Xn(t),0)})(e.arrayValue);case 10:case 11:return(function(e){let t=0;return hn(e.fields,(e,n)=>{t+=e.length+Xn(n)}),t})(e.mapValue);default:throw E(13486,{value:e})}}function Zn(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function er(e){return!!e&&"integerValue"in e}function tr(e){return!!e&&"arrayValue"in e}function nr(e){return!!e&&"nullValue"in e}function rr(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function sr(e){return!!e&&"mapValue"in e}function ir(e){const t=(e?.mapValue?.fields||{})[Ln]?.stringValue;return t===Bn}function or(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return hn(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=or(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=or(e.arrayValue.values[n]);return t}return{...e}}function ar(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===qn}const ur={mapValue:{fields:{[Ln]:{stringValue:Bn},[jn]:{arrayValue:{}}}}};function cr(e){return"nullValue"in e?zn:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?Zn(Fn.empty(),te.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?ir(e)?ur:{mapValue:{}}:E(35942,{value:e})}function lr(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?Zn(Fn.empty(),te.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?ur:"mapValue"in e?ir(e)?{mapValue:{}}:Un:E(61959,{value:e})}function hr(e,t){const n=Qn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function dr(e,t){const n=Qn(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class fr{constructor(e){this.value=e}static empty(){return new fr({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!sr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=or(t)}setAll(e){let t=ee.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=or(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());sr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $n(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];sr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){hn(t,(t,n)=>e[t]=n);for(const t of n)delete e[t]}clone(){return new fr(or(this.value))}}function mr(e){const t=[];return hn(e.fields,(e,n)=>{const r=new ee([e]);if(sr(n)){const e=mr(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new vn(t)
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}class gr{constructor(e,t,n,r,s,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new gr(e,0,ge.min(),ge.min(),ge.min(),fr.empty(),0)}static newFoundDocument(e,t,n,r){return new gr(e,1,t,ge.min(),n,r,0)}static newNoDocument(e,t){return new gr(e,2,t,ge.min(),ge.min(),fr.empty(),0)}static newUnknownDocument(e,t){return new gr(e,3,t,ge.min(),ge.min(),fr.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ge.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=fr.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=fr.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ge.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof gr&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new gr(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class pr{constructor(e,t){this.position=e,this.inclusive=t}}function yr(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(r=i.field.isKeyField()?te.comparator(te.fromName(o.referenceValue),n.key):Qn(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function wr(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!$n(e.position[n],t.position[n]))return!1;return!0}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class br{constructor(e,t="asc"){this.field=e,this.dir=t}}function vr(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ir{}class _r extends Ir{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Pr(e,t,n):"array-contains"===t?new Vr(e,n):"in"===t?new Fr(e,n):"not-in"===t?new Lr(e,n):"array-contains-any"===t?new qr(e,n):new _r(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Or(e,n):new Mr(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(Qn(t,this.value)):null!==t&&Gn(this.value)===Gn(t)&&this.matchesComparison(Qn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return E(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Tr extends Ir{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Tr(e,t)}matches(e){return Er(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Er(e){return"and"===e.op}function Sr(e){return"or"===e.op}function xr(e){return Nr(e)&&Er(e)}function Nr(e){for(const t of e.filters)if(t instanceof Tr)return!1;return!0}function Cr(e){if(e instanceof _r)return e.field.canonicalString()+e.op.toString()+Jn(e.value);if(xr(e))return e.filters.map(e=>Cr(e)).join(",");{const t=e.filters.map(e=>Cr(e)).join(",");return`${e.op}(${t})`}}function Dr(e,t){return e instanceof _r?(function(e,t){return t instanceof _r&&e.op===t.op&&e.field.isEqual(t.field)&&$n(e.value,t.value)})(e,t):e instanceof Tr?(function(e,t){return t instanceof Tr&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&Dr(n,t.filters[r]),!0)})(e,t):void E(19439)}function Ar(e,t){const n=e.filters.concat(t);return Tr.create(n,e.op)}function kr(e){return e instanceof _r?(function(e){return`${e.field.canonicalString()} ${e.op} ${Jn(e.value)}`})(e):e instanceof Tr?(function(e){return e.op.toString()+" {"+e.getFilters().map(kr).join(" ,")+"}"})(e):"Filter"}class Pr extends _r{constructor(e,t,n){super(e,t,n),this.key=te.fromName(n.referenceValue)}matches(e){const t=te.comparator(e.key,this.key);return this.matchesComparison(t)}}class Or extends _r{constructor(e,t){super(e,"in",t),this.keys=Rr("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Mr extends _r{constructor(e,t){super(e,"not-in",t),this.keys=Rr("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Rr(e,t){return(t.arrayValue?.values||[]).map(e=>te.fromName(e.referenceValue))}class Vr extends _r{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return tr(t)&&Kn(t.arrayValue,this.value)}}class Fr extends _r{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&Kn(this.value.arrayValue,t)}}class Lr extends _r{constructor(e,t){super(e,"not-in",t)}matches(e){if(Kn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!Kn(this.value.arrayValue,t)}}class qr extends _r{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!tr(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>Kn(this.value.arrayValue,e))}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ur{constructor(e,t=null,n=[],r=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function Br(e,t=null,n=[],r=[],s=null,i=null,o=null){return new Ur(e,t,n,r,s,i,o)}function jr(e){const t=C(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Cr(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>(function(e){return e.field.canonicalString()+e.dir})(e)).join(","),We(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>Jn(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>Jn(e)).join(",")),t.Te=e}return t.Te}function zr(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!vr(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Dr(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!wr(e.startAt,t.startAt)&&wr(e.endAt,t.endAt)}function Gr(e){return te.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function $r(e,t){return e.filters.filter(e=>e instanceof _r&&e.field.isEqual(t))}function Kr(e,t,n){let r=zn,s=!0;for(const n of $r(e,t)){let e=zn,t=!0;switch(n.op){case"<":case"<=":e=cr(n.value);break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=zn}hr({value:r,inclusive:s},{value:e,inclusive:t})<0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];hr({value:r,inclusive:s},{value:e,inclusive:n.inclusive})<0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}function Qr(e,t,n){let r=Un,s=!0;for(const n of $r(e,t)){let e=Un,t=!0;switch(n.op){case">=":case">":e=lr(n.value),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=Un}dr({value:r,inclusive:s},{value:e,inclusive:t})>0&&(r=e,s=t)}if(null!==n)for(let i=0;i<e.orderBy.length;++i)if(e.orderBy[i].field.isEqual(t)){const e=n.position[i];dr({value:r,inclusive:s},{value:e,inclusive:n.inclusive})>0&&(r=e,s=n.inclusive);break}return{value:r,inclusive:s}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Wr{constructor(e,t=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Hr(e,t,n,r,s,i,o,a){return new Wr(e,t,n,r,s,i,o,a)}function Jr(e){return new Wr(e)}function Yr(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Xr(e){return null!==e.collectionGroup}function Zr(e){const t=C(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const n of t.explicitOrderBy)t.Ie.push(n),e.add(n.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=(function(e){let t=new yn(ee.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new br(r,n))}),e.has(ee.keyField().canonicalString())||t.Ie.push(new br(ee.keyField(),n))}return t.Ie}function es(e){const t=C(e);return t.Ee||(t.Ee=ns(t,Zr(e))),t.Ee}function ts(e){const t=C(e);return t.de||(t.de=ns(t,e.explicitOrderBy)),t.de}function ns(e,t){if("F"===e.limitType)return Br(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new br(e.field,t)});const n=e.endAt?new pr(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new pr(e.startAt.position,e.startAt.inclusive):null;return Br(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function rs(e,t){const n=e.filters.concat([t]);return new Wr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function ss(e,t,n){return new Wr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function is(e,t){return zr(es(e),es(t))&&e.limitType===t.limitType}function os(e){return`${jr(es(e))}|lt:${e.limitType}`}function as(e){return`Query(target=${(function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>kr(e)).join(", ")}]`),We(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>(function(e){return`${e.field.canonicalString()} (${e.dir})`})(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>Jn(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>Jn(e)).join(",")),`Target(${t})`})(es(e))}; limitType=${e.limitType})`}function us(e,t){return t.isFoundDocument()&&(function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):te.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)})(e,t)&&(function(e,t){for(const n of Zr(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0})(e,t)&&(function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0})(e,t)&&(function(e,t){return!(e.startAt&&!(function(e,t,n){const r=yr(e,t,n);return e.inclusive?r<=0:r<0})(e.startAt,Zr(e),t))&&!(e.endAt&&!(function(e,t,n){const r=yr(e,t,n);return e.inclusive?r>=0:r>0})(e.endAt,Zr(e),t))})(e,t)}function cs(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function ls(e){return(t,n)=>{let r=!1;for(const s of Zr(e)){const e=hs(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function hs(e,t,n){const r=e.field.isKeyField()?te.comparator(t.key,n.key):(function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?Qn(r,s):E(42886)})(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return E(19790,{direction:e.dir})}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ds{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){hn(this.inner,(t,n)=>{for(const[t,r]of n)e(t,r)})}isEmpty(){return fn(this.inner)}size(){return this.innerSize}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const fs=new mn(te.comparator);function ms(){return fs}const gs=new mn(te.comparator);function ps(...e){let t=gs;for(const n of e)t=t.insert(n.key,n);return t}function ys(e){let t=gs;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function ws(){return vs()}function bs(){return vs()}function vs(){return new ds(e=>e.toString(),(e,t)=>e.isEqual(t))}const Is=new mn(te.comparator),_s=new yn(te.comparator);function Ts(...e){let t=_s;for(const n of e)t=t.add(n);return t}const Es=new yn(z);function Ss(){return Es}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function xs(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:He(t)?"-0":t}}function Ns(e){return{integerValue:""+e}}function Cs(e,t){return Je(t)?Ns(t):xs(e,t)}
/**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ds{constructor(){this._=void 0}}function As(e,t,n){return e instanceof Os?(function(e,t){const n={fields:{[Dn]:{stringValue:Cn},[kn]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Pn(t)&&(t=On(t)),t&&(n.fields[An]=t),{mapValue:n}})(n,t):e instanceof Ms?Rs(e,t):e instanceof Vs?Fs(e,t):(function(e,t){const n=Ps(e,t),r=qs(n)+qs(e.Ae);return er(n)&&er(e.Ae)?Ns(r):xs(e.serializer,r)})(e,t)}function ks(e,t,n){return e instanceof Ms?Rs(e,t):e instanceof Vs?Fs(e,t):n}function Ps(e,t){return e instanceof Ls?(function(e){return er(e)||(function(e){return!!e&&"doubleValue"in e})(e)})(t)?t:{integerValue:0}:null}class Os extends Ds{}class Ms extends Ds{constructor(e){super(),this.elements=e}}function Rs(e,t){const n=Us(t);for(const t of e.elements)n.some(e=>$n(e,t))||n.push(t);return{arrayValue:{values:n}}}class Vs extends Ds{constructor(e){super(),this.elements=e}}function Fs(e,t){let n=Us(t);for(const t of e.elements)n=n.filter(e=>!$n(e,t));return{arrayValue:{values:n}}}class Ls extends Ds{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function qs(e){return xn(e.integerValue||e.doubleValue)}function Us(e){return tr(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Bs{constructor(e,t){this.field=e,this.transform=t}}function js(e,t){return e.field.isEqual(t.field)&&(function(e,t){return e instanceof Ms&&t instanceof Ms||e instanceof Vs&&t instanceof Vs?W(e.elements,t.elements,$n):e instanceof Ls&&t instanceof Ls?$n(e.Ae,t.Ae):e instanceof Os&&t instanceof Os})(e.transform,t.transform)}class zs{constructor(e,t){this.version=e,this.transformResults=t}}class Gs{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Gs}static exists(e){return new Gs(void 0,e)}static updateTime(e){return new Gs(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function $s(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Ks{}function Qs(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new ri(e.key,Gs.none()):new Xs(e.key,e.data,Gs.none());{const n=e.data,r=fr.empty();let s=new yn(ee.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new Zs(e.key,r,new vn(s.toArray()),Gs.none())}}function Ws(e,t,n){e instanceof Xs?(function(e,t,n){const r=e.value.clone(),s=ti(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()})(e,t,n):e instanceof Zs?(function(e,t,n){if(!$s(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=ti(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(ei(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()})(e,t,n):(function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()})(0,t,n)}function Hs(e,t,n,r){return e instanceof Xs?(function(e,t,n,r){if(!$s(e.precondition,t))return n;const s=e.value.clone(),i=ni(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null})(e,t,n,r):e instanceof Zs?(function(e,t,n,r){if(!$s(e.precondition,t))return n;const s=ni(e.fieldTransforms,r,t),i=t.data;return i.setAll(ei(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))})(e,t,n,r):(function(e,t,n){return $s(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n})(e,t,n)}function Js(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=Ps(r.transform,e||null);null!=s&&(null===n&&(n=fr.empty()),n.set(r.field,s))}return n||null}function Ys(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!(function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&W(e,t,(e,t)=>js(e,t))})(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class Xs extends Ks{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Zs extends Ks{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function ei(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function ti(e,t,n){const r=new Map;x(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,ks(o,a,n[s]))}return r}function ni(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,As(e,i,t))}return r}class ri extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class si extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ii{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];r.key.isEqual(e.key)&&Ws(r,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Hs(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Hs(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=bs();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(r.key)?null:o;const a=Qs(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(ge.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ts())}isEqual(e){return this.batchId===e.batchId&&W(this.mutations,e.mutations,(e,t)=>Ys(e,t))&&W(this.baseMutations,e.baseMutations,(e,t)=>Ys(e,t))}}class oi{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){x(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=Is;const s=e.mutations;for(let e=0;e<s.length;e++)r=r.insert(s[e].key,n[e].version);return new oi(e,t,n,r)}}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ai{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ui{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ci{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var li,hi;function di(e){switch(e){case D.OK:return E(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return E(15467,{code:e})}}function fi(e){if(void 0===e)return I("GRPC error has no .code"),D.UNKNOWN;switch(e){case li.OK:return D.OK;case li.CANCELLED:return D.CANCELLED;case li.UNKNOWN:return D.UNKNOWN;case li.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case li.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case li.INTERNAL:return D.INTERNAL;case li.UNAVAILABLE:return D.UNAVAILABLE;case li.UNAUTHENTICATED:return D.UNAUTHENTICATED;case li.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case li.NOT_FOUND:return D.NOT_FOUND;case li.ALREADY_EXISTS:return D.ALREADY_EXISTS;case li.PERMISSION_DENIED:return D.PERMISSION_DENIED;case li.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case li.ABORTED:return D.ABORTED;case li.OUT_OF_RANGE:return D.OUT_OF_RANGE;case li.UNIMPLEMENTED:return D.UNIMPLEMENTED;case li.DATA_LOSS:return D.DATA_LOSS;default:return E(39323,{code:e})}}(hi=li||(li={}))[hi.OK=0]="OK",hi[hi.CANCELLED=1]="CANCELLED",hi[hi.UNKNOWN=2]="UNKNOWN",hi[hi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",hi[hi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",hi[hi.NOT_FOUND=5]="NOT_FOUND",hi[hi.ALREADY_EXISTS=6]="ALREADY_EXISTS",hi[hi.PERMISSION_DENIED=7]="PERMISSION_DENIED",hi[hi.UNAUTHENTICATED=16]="UNAUTHENTICATED",hi[hi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",hi[hi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",hi[hi.ABORTED=10]="ABORTED",hi[hi.OUT_OF_RANGE=11]="OUT_OF_RANGE",hi[hi.UNIMPLEMENTED=12]="UNIMPLEMENTED",hi[hi.INTERNAL=13]="INTERNAL",hi[hi.UNAVAILABLE=14]="UNAVAILABLE",hi[hi.DATA_LOSS=15]="DATA_LOSS";
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
let mi=null;
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function gi(){return new TextEncoder}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const pi=new h.Integer([4294967295,4294967295],0);function yi(e){const t=gi().encode(e),n=new h.Md5;return n.update(t),new Uint8Array(n.digest())}function wi(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new h.Integer([n,r],0),new h.Integer([s,i],0)]}class bi{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new vi(`Invalid padding: ${t}`);if(n<0)throw new vi(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new vi(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new vi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=h.Integer.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(h.Integer.fromNumber(n)));return 1===r.compare(pi)&&(r=new h.Integer([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=yi(e),[n,r]=wi(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(n,r,e);if(!this.we(t))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new bi(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=yi(e),[n,r]=wi(t);for(let e=0;e<this.hashCount;e++){const t=this.ye(n,r,e);this.Se(t)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class vi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ii{constructor(e,t,n,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,_i.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ii(ge.min(),r,new mn(z),ms(),Ts())}}class _i{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new _i(n,t,Ts(),Ts(),Ts())}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ti{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class Ei{constructor(e,t){this.targetId=e,this.Ce=t}}class Si{constructor(e,t,n=Tn.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class xi{constructor(){this.ve=0,this.Fe=Di(),this.Me=Tn.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Ts(),t=Ts(),n=Ts();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:E(38017,{changeType:s})}}),new _i(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Di()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,x(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Ni{constructor(e){this.Ge=e,this.ze=new Map,this.je=ms(),this.Je=Ci(),this.He=Ci(),this.Ye=new mn(z)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:E(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const s=r.target;if(Gr(s))if(0===n){const e=new te(s.path);this.et(t,e,gr.newNoDocument(e,ge.min()))}else x(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),s=n?this.ct(n,e,r):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}mi?.lt((function(e,t,n,r,s){const i={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(i.bloomFilter={applied:0===s,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),i}
/**
            * @license
            * Copyright 2017 Google LLC
            *
            * Licensed under the Apache License, Version 2.0 (the "License");
            * you may not use this file except in compliance with the License.
            * You may obtain a copy of the License at
            *
            *   http://www.apache.org/licenses/LICENSE-2.0
            *
            * Unless required by applicable law or agreed to in writing, software
            * distributed under the License is distributed on an "AS IS" BASIS,
            * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            * See the License for the specific language governing permissions and
            * limitations under the License.
            */)(r,e.Ce,this.Ge.ht(),n,s))}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,o;try{i=Nn(n).toUint8Array()}catch(e){if(e instanceof In)return _("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new bi(i,r,s)}catch(e){return _(e instanceof vi?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const s=this.ot(r);if(s){if(n.current&&Gr(s.target)){const t=new te(s.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,gr.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=Ts();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new Ii(e,t,this.Ye,this.je,n);return this.je=ms(),this.Je=Ci(),this.He=Ci(),this.Ye=new mn(z),r}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new xi,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new yn(z),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new yn(z),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||v("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new xi),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ci(){return new mn(te.comparator)}function Di(){return new mn(te.comparator)}const Ai={asc:"ASCENDING",desc:"DESCENDING"},ki={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Pi={and:"AND",or:"OR"};class Oi{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Mi(e,t){return e.useProto3Json||We(t)?t:{value:t}}function Ri(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Vi(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Fi(e,t){return Ri(e,t.toTimestamp())}function Li(e){return x(!!e,49232),ge.fromTimestamp((function(e){const t=Sn(e);return new me(t.seconds,t.nanos)})(e))}function qi(e,t){return Ui(e,t).canonicalString()}function Ui(e,t){const n=(function(e){return new X(["projects",e.projectId,"databases",e.database])})(e).child("documents");return void 0===t?n:n.child(t)}function Bi(e){const t=X.fromString(e);return x(go(t),10190,{key:t.toString()}),t}function ji(e,t){return qi(e.databaseId,t.path)}function zi(e,t){const n=Bi(t);if(n.get(1)!==e.databaseId.projectId)throw new A(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new A(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new te(Qi(n))}function Gi(e,t){return qi(e.databaseId,t)}function $i(e){const t=Bi(e);return 4===t.length?X.emptyPath():Qi(t)}function Ki(e){return new X(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Qi(e){return x(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Wi(e,t,n){return{name:ji(e,t),fields:n.value.mapValue.fields}}function Hi(e,t,n){const r=zi(e,t.name),s=Li(t.updateTime),i=t.createTime?Li(t.createTime):ge.min(),o=new fr({mapValue:{fields:t.fields}}),a=gr.newFoundDocument(r,s,i,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}function Ji(e,t){return"found"in t?(function(e,t){x(!!t.found,43571),t.found.name,t.found.updateTime;const n=zi(e,t.found.name),r=Li(t.found.updateTime),s=t.found.createTime?Li(t.found.createTime):ge.min(),i=new fr({mapValue:{fields:t.found.fields}});return gr.newFoundDocument(n,r,s,i)})(e,t):"missing"in t?(function(e,t){x(!!t.missing,3894),x(!!t.readTime,22933);const n=zi(e,t.missing),r=Li(t.readTime);return gr.newNoDocument(n,r)})(e,t):E(7234,{result:t})}function Yi(e,t){let n;if("targetChange"in t){t.targetChange;const r=(function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:E(39313,{state:e})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(e,t){return e.useProto3Json?(x(void 0===t||"string"==typeof t,58123),Tn.fromBase64String(t||"")):(x(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),Tn.fromUint8Array(t||new Uint8Array))})(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&(function(e){const t=void 0===e.code?D.UNKNOWN:fi(e.code);return new A(t,e.message||"")})(o);n=new Si(r,s,i,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=zi(e,r.document.name),i=Li(r.document.updateTime),o=r.document.createTime?Li(r.document.createTime):ge.min(),a=new fr({mapValue:{fields:r.document.fields}}),u=gr.newFoundDocument(s,i,o,a),c=r.targetIds||[],l=r.removedTargetIds||[];n=new Ti(c,l,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=zi(e,r.document),i=r.readTime?Li(r.readTime):ge.min(),o=gr.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Ti([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=zi(e,r.document),i=r.removedTargetIds||[];n=new Ti([],i,s,null)}else{if(!("filter"in t))return E(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new ci(r,s),o=e.targetId;n=new Ei(o,i)}}return n}function Xi(e,t){let n;if(t instanceof Xs)n={update:Wi(e,t.key,t.value)};else if(t instanceof ri)n={delete:ji(e,t.key)};else if(t instanceof Zs)n={update:Wi(e,t.key,t.data),updateMask:mo(t.fieldMask)};else{if(!(t instanceof si))return E(16599,{Vt:t.type});n={verify:ji(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){const n=t.transform;if(n instanceof Os)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ms)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Vs)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ls)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw E(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(n.currentDocument=(function(e,t){return void 0!==t.updateTime?{updateTime:Fi(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:E(27497)})(e,t.precondition)),n}function Zi(e,t){const n=t.currentDocument?(function(e){return void 0!==e.updateTime?Gs.updateTime(Li(e.updateTime)):void 0!==e.exists?Gs.exists(e.exists):Gs.none()})(t.currentDocument):Gs.none(),r=t.updateTransforms?t.updateTransforms.map(t=>(function(e,t){let n=null;if("setToServerValue"in t)x("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new Os;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new Ms(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new Vs(e)}else"increment"in t?n=new Ls(e,t.increment):E(16584,{proto:t});const r=ee.fromServerFormat(t.fieldPath);return new Bs(r,n)})(e,t)):[];if(t.update){t.update.name;const s=zi(e,t.update.name),i=new fr({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=(function(e){const t=e.fieldPaths||[];return new vn(t.map(e=>ee.fromServerFormat(e)))})(t.updateMask);return new Zs(s,i,e,n,r)}return new Xs(s,i,n,r)}if(t.delete){const r=zi(e,t.delete);return new ri(r,n)}if(t.verify){const r=zi(e,t.verify);return new si(r,n)}return E(1463,{proto:t})}function eo(e,t){return e&&e.length>0?(x(void 0!==t,14353),e.map(e=>(function(e,t){let n=e.updateTime?Li(e.updateTime):Li(t);return n.isEqual(ge.min())&&(n=Li(t)),new zs(n,e.transformResults||[])})(e,t))):[]}function to(e,t){return{documents:[Gi(e,t.path)]}}function no(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Gi(e,s);const i=(function(e){if(0!==e.length)return fo(Tr.create(e,"and"))})(t.filters);i&&(n.structuredQuery.where=i);const o=(function(e){if(0!==e.length)return e.map(e=>(function(e){return{field:lo(e.field),direction:ao(e.dir)}})(e))})(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Mi(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=(function(e){return{before:e.inclusive,values:e.position}})(t.startAt)),t.endAt&&(n.structuredQuery.endAt=(function(e){return{before:!e.inclusive,values:e.position}})(t.endAt)),{ft:n,parent:s}}function ro(e,t,n,r){const{ft:s,parent:i}=no(e,t),o={},a=[];let u=0;return n.forEach(e=>{const t=r?e.alias:"aggregate_"+u++;o[t]=e.alias,"count"===e.aggregateType?a.push({alias:t,count:{}}):"avg"===e.aggregateType?a.push({alias:t,avg:{field:lo(e.fieldPath)}}):"sum"===e.aggregateType&&a.push({alias:t,sum:{field:lo(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:s.structuredQuery},parent:s.parent},gt:o,parent:i}}function so(e){let t=$i(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){x(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=(function(e){const t=oo(e);return t instanceof Tr&&xr(t)?t.getFilters():[t]})(n.where));let o=[];n.orderBy&&(o=(function(e){return e.map(e=>(function(e){return new br(ho(e.field),(function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(e.direction))})(e))})(n.orderBy));let a=null;n.limit&&(a=(function(e){let t;return t="object"==typeof e?e.value:e,We(t)?null:t})(n.limit));let u=null;n.startAt&&(u=(function(e){const t=!!e.before,n=e.values||[];return new pr(n,t)})(n.startAt));let c=null;return n.endAt&&(c=(function(e){const t=!e.before,n=e.values||[];return new pr(n,t)})(n.endAt)),Hr(t,s,o,i,a,"F",u,c)}function io(e,t){const n=(function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return E(28987,{purpose:e})}})(t.purpose);return null==n?null:{"goog-listen-tags":n}}function oo(e){return void 0!==e.unaryFilter?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=ho(e.unaryFilter.field);return _r.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=ho(e.unaryFilter.field);return _r.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=ho(e.unaryFilter.field);return _r.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=ho(e.unaryFilter.field);return _r.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return E(61313);default:return E(60726)}})(e):void 0!==e.fieldFilter?(function(e){return _r.create(ho(e.fieldFilter.field),(function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return E(58110);default:return E(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(e):void 0!==e.compositeFilter?(function(e){return Tr.create(e.compositeFilter.filters.map(e=>oo(e)),(function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return E(1026)}})(e.compositeFilter.op))})(e):E(30097,{filter:e})}function ao(e){return Ai[e]}function uo(e){return ki[e]}function co(e){return Pi[e]}function lo(e){return{fieldPath:e.canonicalString()}}function ho(e){return ee.fromServerFormat(e.fieldPath)}function fo(e){return e instanceof _r?(function(e){if("=="===e.op){if(rr(e.value))return{unaryFilter:{field:lo(e.field),op:"IS_NAN"}};if(nr(e.value))return{unaryFilter:{field:lo(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(rr(e.value))return{unaryFilter:{field:lo(e.field),op:"IS_NOT_NAN"}};if(nr(e.value))return{unaryFilter:{field:lo(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:lo(e.field),op:uo(e.op),value:e.value}}})(e):e instanceof Tr?(function(e){const t=e.getFilters().map(e=>fo(e));return 1===t.length?t[0]:{compositeFilter:{op:co(e.op),filters:t}}})(e):E(54877,{filter:e})}function mo(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function go(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class po{constructor(e,t,n,r,s=ge.min(),i=ge.min(),o=Tn.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new po(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new po(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new po(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new po(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class yo{constructor(e){this.yt=e}}function wo(e,t){let n;if(t.document)n=Hi(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=te.fromSegments(t.noDocument.path),r=_o(t.noDocument.readTime);n=gr.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return E(56709);{const e=te.fromSegments(t.unknownDocument.path),r=_o(t.unknownDocument.version);n=gr.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime((function(e){const t=new me(e[0],e[1]);return ge.fromTimestamp(t)})(t.readTime)),n}function bo(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:vo(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=(function(e,t){return{name:ji(e,t.key),fields:t.data.value.mapValue.fields,updateTime:Ri(e,t.version.toTimestamp()),createTime:Ri(e,t.createTime.toTimestamp())}})(e.yt,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Io(t.version)};else{if(!t.isUnknownDocument())return E(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:Io(t.version)}}return r}function vo(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Io(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function _o(e){const t=new me(e.seconds,e.nanoseconds);return ge.fromTimestamp(t)}function To(e,t){const n=(t.baseMutations||[]).map(t=>Zi(e.yt,t));for(let e=0;e<t.mutations.length-1;++e){const n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){const r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}const r=t.mutations.map(t=>Zi(e.yt,t)),s=me.fromMillis(t.localWriteTimeMs);return new ii(t.batchId,s,n,r)}function Eo(e){const t=_o(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?_o(e.lastLimboFreeSnapshotVersion):ge.min();let r;return r=(function(e){return void 0!==e.documents})(e.query)?(function(e){const t=e.documents.length;return x(1===t,1966,{count:t}),es(Jr($i(e.documents[0])))})(e.query):(function(e){return es(so(e))})(e.query),new po(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,Tn.fromBase64String(e.resumeToken))}function So(e,t){const n=Io(t.snapshotVersion),r=Io(t.lastLimboFreeSnapshotVersion);let s;s=Gr(t.target)?to(e.yt,t.target):no(e.yt,t.target).ft;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:jr(t.target),readTime:n,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function xo(e){const t=so({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ss(t,t.limit,"L"):t}function No(e,t){return new ai(t.largestBatchId,Zi(e.yt,t.overlayMutation))}function Co(e,t){const n=t.path.lastSegment();return[e,Xe(t.path.popLast()),n]}function Do(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Io(r.readTime),documentKey:Xe(r.documentKey.path),largestBatchId:r.largestBatchId}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ao{getBundleMetadata(e,t){return ko(e).get(t).next(e=>{if(e)return(function(e){return{id:e.bundleId,createTime:_o(e.createTime),version:e.version}})(e)})}saveBundleMetadata(e,t){return ko(e).put((function(e){return{bundleId:e.id,createTime:Io(Li(e.createTime)),version:e.version}})(t))}getNamedQuery(e,t){return Po(e).get(t).next(e=>{if(e)return(function(e){return{name:e.name,query:xo(e.bundledQuery),readTime:_o(e.readTime)}})(e)})}saveNamedQuery(e,t){return Po(e).put((function(e){return{name:e.name,readTime:Io(Li(e.readTime)),bundledQuery:e.bundledQuery}})(t))}}function ko(e){return cn(e,Mt)}function Po(e){return cn(e,Rt)}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Oo{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new Oo(e,n)}getOverlay(e,t){return Mo(e).get(Co(this.userId,t)).next(e=>e?No(this.serializer,e):null)}getOverlays(e,t){const n=ws();return ke.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,s)=>{const i=new ai(t,s);r.push(this.St(e,i))}),ke.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(Xe(e.getCollectionPath())));const s=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);s.push(Mo(e).Z(Wt,r))}),ke.waitFor(s)}getOverlaysForCollection(e,t,n){const r=ws(),s=Xe(t),i=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Mo(e).J(Wt,i).next(e=>{for(const t of e){const e=No(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const s=ws();let i;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Mo(e).ee({index:Jt,range:o},(e,t,n)=>{const o=No(this.serializer,t);s.size()<r||o.largestBatchId===i?(s.set(o.getKey(),o),i=o.largestBatchId):n.done()}).next(()=>s)}St(e,t){return Mo(e).put((function(e,t,n){const[r,s,i]=Co(t,n.mutation.key);return{userId:t,collectionPath:s,documentId:i,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:Xi(e.yt,n.mutation)}})(this.serializer,this.userId,t))}}function Mo(e){return cn(e,Kt)}
/**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ro{bt(e){return cn(e,Xt)}getSessionToken(e){return this.bt(e).get("sessionToken").next(e=>{const t=e?.value;return t?Tn.fromUint8Array(t):Tn.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Vo{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(xn(e.integerValue));else if("doubleValue"in e){const n=xn(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),He(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=Sn(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Nn(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?ar(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):ir(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):E(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const e of Object.keys(n))this.Ot(e,t),this.Ct(n[e],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const r=jn,s=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(xn(s)),this.Ot(r,t),this.Ct(n[r],t)}Qt(e,t){const n=e.values||[];this.Ft(t,50);for(const e of n)this.Ct(e,t)}Lt(e,t){this.Ft(t,37),te.fromName(e).path.forEach(e=>{this.Ft(t,60),this.Ut(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}Vo.Kt=new Vo;
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Fo=255;function Lo(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function qo(e){const t=64-(function(e){let t=0;for(let n=0;n<8;++n){const r=Lo(255&e[n]);if(t+=r,8!==r)break}return t})(e);return Math.ceil(t/8)}class Uo{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Yt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{const e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Zt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Jt(e);else if(e<2048)this.Jt(960|e>>>6),this.Jt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Jt(480|e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e);else{const e=t.codePointAt(0);this.Jt(240|e>>>18),this.Jt(128|63&e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e)}}this.Ht()}Xt(e){const t=this.en(e),n=qo(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}nn(e){const t=this.en(e),n=qo(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}rn(){this.sn(Fo),this.sn(255)}_n(){this.an(Fo),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Gt(e){const t=255&e;0===t?(this.sn(0),this.sn(255)):t===Fo?(this.sn(Fo),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;0===t?(this.an(0),this.an(255)):t===Fo?(this.an(Fo),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class Bo{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class jo{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class zo{constructor(){this.cn=new Uo,this.ln=new Bo(this.cn),this.hn=new jo(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return 0===e?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Go{constructor(e,t,n,r){this.Tn=e,this.In=t,this.En=n,this.dn=r}An(){const e=this.dn.length,t=0===e||255===this.dn[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new Go(this.Tn,this.In,this.En,n)}Rn(e,t,n){return{indexId:this.Tn,uid:e,arrayValue:Qo(this.En),directionalValue:Qo(this.dn),orderedDocumentKey:Qo(t),documentKey:n.path.toArray()}}Vn(e,t,n){const r=this.Rn(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function $o(e,t){let n=e.Tn-t.Tn;return 0!==n?n:(n=Ko(e.En,t.En),0!==n?n:(n=Ko(e.dn,t.dn),0!==n?n:te.comparator(e.In,t.In)))}function Ko(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function Qo(e){return(0,l.isSafariOrWebkit)()?(function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t})(e):e}function Wo(e){return"string"!=typeof e?e:(function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
    * @license
    * Copyright 2022 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */)(e)}class Ho{constructor(e){this.mn=new yn((e,t)=>ee.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[];for(const t of e.filters){const e=t;e.isInequality()?this.mn=this.mn.add(e):this.gn.push(e)}}get pn(){return this.mn.size>1}yn(e){if(x(e.collectionGroup===this.collectionId,49279),this.pn)return!1;const t=we(e);if(void 0!==t&&!this.wn(t))return!1;const n=be(e);let r=new Set,s=0,i=0;for(;s<n.length&&this.wn(n[s]);++s)r=r.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.mn.size>0){const e=this.mn.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[s];if(!this.Sn(e,t)||!this.bn(this.fn[i++],t))return!1}++s}for(;s<n.length;++s){const e=n[s];if(i>=this.fn.length||!this.bn(this.fn[i++],e))return!1}return!0}Dn(){if(this.pn)return null;let e=new yn(ee.comparator);const t=[];for(const n of this.gn)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new Ie(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Ie(n.field,0))}for(const n of this.fn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Ie(n.field,"asc"===n.dir?0:1)));return new ye(ye.UNKNOWN_ID,this.collectionId,t,Te.empty())}wn(e){for(const t of this.gn)if(this.Sn(t,e))return!0;return!1}Sn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}bn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Jo(e){if(x(e instanceof _r||e instanceof Tr,20012),e instanceof _r){if(e instanceof Fr){const t=e.value.arrayValue?.values?.map(t=>_r.create(e.field,"==",t))||[];return Tr.create(t,"or")}return e}const t=e.filters.map(e=>Jo(e));return Tr.create(t,e.op)}function Yo(e){if(0===e.getFilters().length)return[];const t=ta(Jo(e));return x(ea(t),7391),Xo(t)||Zo(t)?[t]:t.getFilters()}function Xo(e){return e instanceof _r}function Zo(e){return e instanceof Tr&&xr(e)}function ea(e){return Xo(e)||Zo(e)||(function(e){if(e instanceof Tr&&Sr(e)){for(const t of e.getFilters())if(!Xo(t)&&!Zo(t))return!1;return!0}return!1})(e)}function ta(e){if(x(e instanceof _r||e instanceof Tr,34018),e instanceof _r)return e;if(1===e.filters.length)return ta(e.filters[0]);const t=e.filters.map(e=>ta(e));let n=Tr.create(t,e.op);return n=sa(n),ea(n)?n:(x(n instanceof Tr,64498),x(Er(n),40251),x(n.filters.length>1,57927),n.filters.reduce((e,t)=>na(e,t)))}function na(e,t){let n;return x(e instanceof _r||e instanceof Tr,38388),x(t instanceof _r||t instanceof Tr,25473),n=e instanceof _r?t instanceof _r?(function(e,t){return Tr.create([e,t],"and")})(e,t):ra(e,t):t instanceof _r?ra(t,e):(function(e,t){if(x(e.filters.length>0&&t.filters.length>0,48005),Er(e)&&Er(t))return Ar(e,t.getFilters());const n=Sr(e)?e:t,r=Sr(e)?t:e,s=n.filters.map(e=>na(e,r));return Tr.create(s,"or")})(e,t),sa(n)}function ra(e,t){if(Er(t))return Ar(t,e.getFilters());{const n=t.filters.map(t=>na(e,t));return Tr.create(n,"or")}}function sa(e){if(x(e instanceof _r||e instanceof Tr,11850),e instanceof _r)return e;const t=e.getFilters();if(1===t.length)return sa(t[0]);if(Nr(e))return e;const n=t.map(e=>sa(e)),r=[];return n.forEach(t=>{t instanceof _r?r.push(t):t instanceof Tr&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:Tr.create(r,e.op)
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}class ia{constructor(){this.Cn=new oa}addToCollectionParentIndex(e,t){return this.Cn.add(t),ke.resolve()}getCollectionParents(e,t){return ke.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return ke.resolve()}deleteFieldIndex(e,t){return ke.resolve()}deleteAllFieldIndexes(e){return ke.resolve()}createTargetIndexes(e,t){return ke.resolve()}getDocumentsMatchingTarget(e,t){return ke.resolve(null)}getIndexType(e,t){return ke.resolve(0)}getFieldIndexes(e,t){return ke.resolve([])}getNextCollectionGroupToUpdate(e){return ke.resolve(null)}getMinOffset(e,t){return ke.resolve(xe.min())}getMinOffsetFromCollectionGroup(e,t){return ke.resolve(xe.min())}updateCollectionGroup(e,t,n){return ke.resolve()}updateIndexEntries(e,t){return ke.resolve()}}class oa{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new yn(X.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new yn(X.comparator)).toArray()}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const aa="IndexedDbIndexManager",ua=new Uint8Array(0);class ca{constructor(e,t){this.databaseId=t,this.vn=new oa,this.Fn=new ds(e=>jr(e),(e,t)=>zr(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});const s={collectionId:n,parent:Xe(r)};return la(e).put(s)}return ke.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[H(t),""],!1,!0);return la(e).J(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(tt(r.parent))}return n})}addFieldIndex(e,t){const n=da(e),r=(function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}})(t);delete r.indexId;const s=n.add(r);if(t.indexState){const n=fa(e);return s.next(e=>{n.put(Do(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const n=da(e),r=fa(e),s=ha(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=da(e),n=ha(e),r=fa(e);return t.Z().next(()=>n.Z()).next(()=>r.Z())}createTargetIndexes(e,t){return ke.forEach(this.Mn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new Ho(t).Dn();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=ha(e);let r=!0;const s=new Map;return ke.forEach(this.Mn(t),t=>this.xn(e,t).next(e=>{r&&(r=!!e),s.set(t,e)})).next(()=>{if(r){let e=Ts();const r=[];return ke.forEach(s,(s,i)=>{v(aa,`Using index ${(function(e){return`id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`})(s)} to execute ${jr(t)}`);const o=(function(e,t){const n=we(t);if(void 0===n)return null;for(const t of $r(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null})(i,s),a=(function(e,t){const n=new Map;for(const r of be(t))for(const t of $r(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null})(i,s),u=(function(e,t){const n=[];let r=!0;for(const s of be(t)){const t=0===s.kind?Kr(e,s.fieldPath,e.startAt):Qr(e,s.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new pr(n,r)})(i,s),c=(function(e,t){const n=[];let r=!0;for(const s of be(t)){const t=0===s.kind?Qr(e,s.fieldPath,e.endAt):Kr(e,s.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new pr(n,r)})(i,s),l=this.On(s,i,u),h=this.On(s,i,c),d=this.Nn(s,i,a),f=this.Bn(s.indexId,o,l,u.inclusive,h,c.inclusive,d);return ke.forEach(f,s=>n.Y(s,t.limit).next(t=>{t.forEach(t=>{const n=te.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return ke.resolve(null)})}Mn(e){let t=this.Fn.get(e);return t||(t=0===e.filters.length?[e]:Yo(Tr.create(e.filters,"and")).map(t=>Br(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Fn.set(e,t),t)}Bn(e,t,n,r,s,i,o){const a=(null!=t?t.length:1)*Math.max(n.length,s.length),u=a/(null!=t?t.length:1),c=[];for(let l=0;l<a;++l){const a=t?this.Ln(t[l/u]):ua,h=this.kn(e,a,n[l%u],r),d=this.qn(e,a,s[l%u],i),f=o.map(t=>this.kn(e,a,t,!0));c.push(...this.createRange(h,d,f))}return c}kn(e,t,n,r){const s=new Go(e,te.empty(),t,n);return r?s:s.An()}qn(e,t,n,r){const s=new Go(e,te.empty(),t,n);return r?s.An():s}xn(e,t){const n=new Ho(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.yn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.Mn(t);return ke.forEach(r,t=>this.xn(e,t).next(e=>{e?0!==n&&e.fields.length<(function(e){let t=new yn(ee.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)})(t)&&(n=1):n=0})).next(()=>(function(e){return null!==e.limit})(t)&&r.length>1&&2===n?1:n)}Qn(e,t){const n=new zo;for(const r of be(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const s=n.Pn(r.kind);Vo.Kt.Dt(e,s)}return n.un()}Ln(e){const t=new zo;return Vo.Kt.Dt(e,t.Pn(0)),t.un()}$n(e,t){const n=new zo;return Vo.Kt.Dt(Zn(this.databaseId,t),n.Pn((function(e){const t=be(e);return 0===t.length?0:t[t.length-1].kind})(e))),n.un()}Nn(e,t,n){if(null===n)return[];let r=[];r.push(new zo);let s=0;for(const i of be(e)){const e=n[s++];for(const n of r)if(this.Un(t,i.fieldPath)&&tr(e))r=this.Kn(r,i,e);else{const t=n.Pn(i.kind);Vo.Kt.Dt(e,t)}}return this.Wn(r)}On(e,t,n){return this.Nn(e,t,n.position)}Wn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Kn(e,t,n){const r=[...e],s=[];for(const e of n.arrayValue.values||[])for(const n of r){const r=new zo;r.seed(n.un()),Vo.Kt.Dt(e,r.Pn(t.kind)),s.push(r)}return s}Un(e,t){return!!e.filters.find(e=>e instanceof _r&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=da(e),r=fa(e);return(t?n.J(Ft,IDBKeyRange.bound(t,t)):n.J()).next(e=>{const t=[];return ke.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push((function(e,t){const n=t?new Te(t.sequenceNumber,new xe(_o(t.readTime),new te(tt(t.documentKey)),t.largestBatchId)):Te.empty(),r=e.fields.map(([e,t])=>new Ie(ee.fromServerFormat(e),t));return new ye(e.indexId,e.collectionGroup,r,n)})(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:z(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=da(e),s=fa(e);return this.Gn(e).next(e=>r.J(Ft,IDBKeyRange.bound(t,t)).next(t=>ke.forEach(t,t=>s.put(Do(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return ke.forEach(t,(t,r)=>{const s=n.get(t.collectionGroup);return(s?ke.resolve(s):this.getFieldIndexes(e,t.collectionGroup)).next(s=>(n.set(t.collectionGroup,s),ke.forEach(s,n=>this.zn(e,t,n).next(t=>{const s=this.jn(r,n);return t.isEqual(s)?ke.resolve():this.Jn(e,r,n,t,s)}))))})}Hn(e,t,n,r){return ha(e).put(r.Rn(this.uid,this.$n(n,t.key),t.key))}Yn(e,t,n,r){return ha(e).delete(r.Vn(this.uid,this.$n(n,t.key),t.key))}zn(e,t,n){const r=ha(e);let s=new yn($o);return r.ee({index:Gt,range:IDBKeyRange.only([n.indexId,this.uid,Qo(this.$n(n,t))])},(e,r)=>{s=s.add(new Go(n.indexId,t,Wo(r.arrayValue),Wo(r.directionalValue)))}).next(()=>s)}jn(e,t){let n=new yn($o);const r=this.Qn(t,e);if(null==r)return n;const s=we(t);if(null!=s){const i=e.data.field(s.fieldPath);if(tr(i))for(const s of i.arrayValue.values||[])n=n.add(new Go(t.indexId,e.key,this.Ln(s),r))}else n=n.add(new Go(t.indexId,e.key,ua,r));return n}Jn(e,t,n,r,s){v(aa,"Updating index entries for document '%s'",t.key);const i=[];return(function(e,t,n,r,s){const i=e.getIterator(),o=t.getIterator();let a=bn(i),u=bn(o);for(;a||u;){let e=!1,t=!1;if(a&&u){const r=n(a,u);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(u),u=bn(o)):t?(s(a),a=bn(i)):(a=bn(i),u=bn(o))}})(r,s,$o,r=>{i.push(this.Hn(e,t,n,r))},r=>{i.push(this.Yn(e,t,n,r))}),ke.waitFor(i)}Gn(e){let t=1;return fa(e).ee({index:Ut,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>$o(e,t)).filter((e,t,n)=>!t||0!==$o(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=$o(s,e),i=$o(s,t);if(0===n)r[0]=e.An();else if(n>0&&i<0)r.push(s),r.push(s.An());else if(i>0)break}r.push(t);const s=[];for(let e=0;e<r.length;e+=2){if(this.Zn(r[e],r[e+1]))return[];const t=r[e].Vn(this.uid,ua,te.empty()),n=r[e+1].Vn(this.uid,ua,te.empty());s.push(IDBKeyRange.bound(t,n))}return s}Zn(e,t){return $o(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(ma)}getMinOffset(e,t){return ke.mapArray(this.Mn(t),t=>this.xn(e,t).next(e=>e||E(44426))).next(ma)}}function la(e){return cn(e,kt)}function ha(e){return cn(e,jt)}function da(e){return cn(e,Vt)}function fa(e){return cn(e,Lt)}function ma(e){x(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const s=e[r].indexState.offset;Ne(s,t)<0&&(t=s),n<s.largestBatchId&&(n=s.largestBatchId)}return new xe(t.readTime,t.documentKey,n)}
/**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ga={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},pa=41943040;class ya{static withCacheSize(e){return new ya(e,ya.DEFAULT_COLLECTION_PERCENTILE,ya.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function wa(e,t,n){const r=e.store(ot),s=e.store(ft),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const u=r.ee({range:o},(e,t,n)=>(a++,n.delete()));i.push(u.next(()=>{x(1===a,47070,{batchId:n.batchId})}));const c=[];for(const e of n.mutations){const r=ht(t,e.key.path,n.batchId);i.push(s.delete(r)),c.push(e.key)}return ke.waitFor(i).next(()=>c)}function ba(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw E(14731);t=e.noDocument}return JSON.stringify(t).length}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */ya.DEFAULT_COLLECTION_PERCENTILE=10,ya.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ya.DEFAULT=new ya(pa,ya.DEFAULT_COLLECTION_PERCENTILE,ya.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ya.DISABLED=new ya(-1,0,0);class va{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Xn={}}static wt(e,t,n,r){x(""!==e.uid,64387);const s=e.isAuthenticated()?e.uid:"";return new va(s,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return _a(e).ee({index:ut,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const s=Ta(e),i=_a(e);return i.add({}).next(o=>{x("number"==typeof o,49019);const a=new ii(o,t,n,r),u=(function(e,t,n){const r=n.baseMutations.map(t=>Xi(e.yt,t)),s=n.mutations.map(t=>Xi(e.yt,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:s}})(this.serializer,this.userId,a),c=[];let l=new yn((e,t)=>z(e.canonicalString(),t.canonicalString()));for(const e of r){const t=ht(this.userId,e.key.path,o);l=l.add(e.key.path.popLast()),c.push(i.put(u)),c.push(s.put(t,dt))}return l.forEach(t=>{c.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Xn[o]=a.keys()}),ke.waitFor(c).next(()=>a)})}lookupMutationBatch(e,t){return _a(e).get(t).next(e=>e?(x(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),To(this.serializer,e)):null)}er(e,t){return this.Xn[t]?ke.resolve(this.Xn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.Xn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return _a(e).ee({index:ut,range:r},(e,t,r)=>{t.userId===this.userId&&(x(t.batchId>=n,47524,{tr:n}),s=To(this.serializer,t)),r.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Qe;return _a(e).ee({index:ut,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Qe],[this.userId,Number.POSITIVE_INFINITY]);return _a(e).J(ut,t).next(e=>e.map(e=>To(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=lt(this.userId,t.path),r=IDBKeyRange.lowerBound(n),s=[];return Ta(e).ee({range:r},(n,r,i)=>{const[o,a,u]=n,c=tt(a);if(o===this.userId&&t.path.isEqual(c))return _a(e).get(u).next(e=>{if(!e)throw E(61480,{nr:n,batchId:u});x(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:u}),s.push(To(this.serializer,e))});i.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new yn(z);const r=[];return t.forEach(t=>{const s=lt(this.userId,t.path),i=IDBKeyRange.lowerBound(s),o=Ta(e).ee({range:i},(e,r,s)=>{const[i,o,a]=e,u=tt(o);i===this.userId&&t.path.isEqual(u)?n=n.add(a):s.done()});r.push(o)}),ke.waitFor(r).next(()=>this.rr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,s=lt(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new yn(z);return Ta(e).ee({range:i},(e,t,s)=>{const[i,a,u]=e,c=tt(a);i===this.userId&&n.isPrefixOf(c)?c.length===r&&(o=o.add(u)):s.done()}).next(()=>this.rr(e,o))}rr(e,t){const n=[],r=[];return t.forEach(t=>{r.push(_a(e).get(t).next(e=>{if(null===e)throw E(35274,{batchId:t});x(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(To(this.serializer,e))}))}),ke.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return wa(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.ir(t.batchId)}),ke.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return ke.resolve();const n=IDBKeyRange.lowerBound((function(e){return[e]})(this.userId)),r=[];return Ta(e).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=tt(e[1]);r.push(t)}else n.done()}).next(()=>{x(0===r.length,56720,{sr:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return Ia(e,this.userId,t)}_r(e){return Ea(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:Qe,lastStreamToken:""})}}function Ia(e,t,n){const r=lt(t,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Ta(e).ee({range:i,X:!0},(e,n,r)=>{const[i,a,u]=e;i===t&&a===s&&(o=!0),r.done()}).next(()=>o)}function _a(e){return cn(e,ot)}function Ta(e){return cn(e,ft)}function Ea(e){return cn(e,it)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Sa{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Sa(0)}static cr(){return new Sa(-1)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class xa{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.lr(e).next(t=>{const n=new Sa(t.highestTargetId);return t.highestTargetId=n.next(),this.hr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.lr(e).next(e=>ge.fromTimestamp(new me(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.lr(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.lr(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.hr(e,r)))}addTargetData(e,t){return this.Pr(e,t).next(()=>this.lr(e).next(n=>(n.targetCount+=1,this.Tr(t,n),this.hr(e,n))))}updateTargetData(e,t){return this.Pr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Na(e).delete(t.targetId)).next(()=>this.lr(e)).next(t=>(x(t.targetCount>0,8065),t.targetCount-=1,this.hr(e,t)))}removeTargets(e,t,n){let r=0;const s=[];return Na(e).ee((i,o)=>{const a=Eo(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(e,a)))}).next(()=>ke.waitFor(s)).next(()=>r)}forEachTarget(e,t){return Na(e).ee((e,n)=>{const r=Eo(n);t(r)})}lr(e){return Ca(e).get(Dt).next(e=>(x(null!==e,2888),e))}hr(e,t){return Ca(e).put(Dt,t)}Pr(e,t){return Na(e).put(So(this.serializer,t))}Tr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.lr(e).next(e=>e.targetCount)}getTargetData(e,t){const n=jr(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Na(e).ee({range:r,index:Tt},(e,n,r)=>{const i=Eo(n);zr(t,i.target)&&(s=i,r.done())}).next(()=>s)}addMatchingKeys(e,t,n){const r=[],s=Da(e);return t.forEach(t=>{const i=Xe(t.path);r.push(s.put({targetId:n,path:i})),r.push(this.referenceDelegate.addReference(e,n,t))}),ke.waitFor(r)}removeMatchingKeys(e,t,n){const r=Da(e);return ke.forEach(t,t=>{const s=Xe(t.path);return ke.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=Da(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=Da(e);let s=Ts();return r.ee({range:n,X:!0},(e,t,n)=>{const r=tt(e[1]),i=new te(r);s=s.add(i)}).next(()=>s)}containsKey(e,t){const n=Xe(t.path),r=IDBKeyRange.bound([n],[H(n)],!1,!0);let s=0;return Da(e).ee({index:Nt,X:!0,range:r},([e,t],n,r)=>{0!==e&&(s++,r.done())}).next(()=>s>0)}At(e,t){return Na(e).get(t).next(e=>e?Eo(e):null)}}function Na(e){return cn(e,_t)}function Ca(e){return cn(e,At)}function Da(e){return cn(e,St)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Aa="LruGarbageCollector",ka=1048576;function Pa([e,t],[n,r]){const s=z(e,n);return 0===s?z(t,r):s}class Oa{constructor(e){this.Ir=e,this.buffer=new yn(Pa),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Pa(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Ma{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){v(Aa,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Le(e)?v(Aa,"Ignoring IndexedDB error during garbage collection: ",e):await Ae(e)}await this.Vr(3e5)})}}class Ra{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return ke.resolve(Ke.ce);const n=new Oa(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(v("LruGarbageCollector","Garbage collection skipped; disabled"),ke.resolve(ga)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(v("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ga):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,r,s,i,o,a,u;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(v("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),w()<=c.LogLevel.DEBUG&&v("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-l}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(u-a)+"ms\n"+`Total Duration: ${u-l}ms`),ke.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}function Va(e,t){return new Ra(e,t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Fa{constructor(e,t){this.db=e,this.garbageCollector=Va(this,t)}gr(e){const t=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}pr(e,t){return this.Sr(e,(e,n)=>t(n))}addReference(e,t,n){return La(e,n)}removeReference(e,t,n){return La(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return La(e,t)}br(e,t){return(function(e,t){let n=!1;return Ea(e).te(r=>Ia(e,r,t).next(e=>(e&&(n=!0),ke.resolve(!e)))).next(()=>n)})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.Sr(e,(i,o)=>{if(o<=t){const t=this.br(e,i).next(t=>{if(!t)return s++,n.getEntry(e,i).next(()=>(n.removeEntry(i,ge.min()),Da(e).delete((function(e){return[0,Xe(e.path)]})(i))))});r.push(t)}}).next(()=>ke.waitFor(r)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return La(e,t)}Sr(e,t){const n=Da(e);let r,s=Ke.ce;return n.ee({index:Nt},([e,n],{path:i,sequenceNumber:o})=>{0===e?(s!==Ke.ce&&t(new te(tt(r)),s),s=o,r=i):s=Ke.ce}).next(()=>{s!==Ke.ce&&t(new te(tt(r)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function La(e,t){return Da(e).put((function(e,t){return{targetId:0,path:Xe(e.path),sequenceNumber:t}})(t,e.currentSequenceNumber))}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class qa{constructor(){this.changes=new ds(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,gr.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?ke.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ua{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Ga(e).put(n)}removeEntry(e,t,n){return Ga(e).delete((function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],vo(t),n[n.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Dr(e,n)))}getEntry(e,t){let n=gr.newInvalidDocument(t);return Ga(e).ee({index:pt,range:IDBKeyRange.only($a(t))},(e,r)=>{n=this.Cr(t,r)}).next(()=>n)}vr(e,t){let n={size:0,document:gr.newInvalidDocument(t)};return Ga(e).ee({index:pt,range:IDBKeyRange.only($a(t))},(e,r)=>{n={document:this.Cr(t,r),size:ba(r)}}).next(()=>n)}getEntries(e,t){let n=ms();return this.Fr(e,t,(e,t)=>{const r=this.Cr(e,t);n=n.insert(e,r)}).next(()=>n)}Mr(e,t){let n=ms(),r=new mn(te.comparator);return this.Fr(e,t,(e,t)=>{const s=this.Cr(e,t);n=n.insert(e,s),r=r.insert(e,ba(t))}).next(()=>({documents:n,Or:r}))}Fr(e,t,n){if(t.isEmpty())return ke.resolve();let r=new yn(Qa);t.forEach(e=>r=r.add(e));const s=IDBKeyRange.bound($a(r.first()),$a(r.last())),i=r.getIterator();let o=i.getNext();return Ga(e).ee({index:pt,range:s},(e,t,r)=>{const s=te.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&Qa(o,s)<0;)n(o,null),o=i.getNext();o&&o.isEqual(s)&&(n(o,t),o=i.hasNext()?i.getNext():null),o?r.j($a(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,s){const i=t.path,o=[i.popLast().toArray(),i.lastSegment(),vo(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ga(e).J(IDBKeyRange.bound(o,a,!0)).next(e=>{s?.incrementDocumentReadCount(e.length);let n=ms();for(const s of e){const e=this.Cr(te.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);e.isFoundDocument()&&(us(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let s=ms();const i=Ka(t,n),o=Ka(t,xe.max());return Ga(e).ee({index:wt,range:IDBKeyRange.bound(i,o,!0)},(e,t,n)=>{const i=this.Cr(te.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);s=s.insert(i.key,i),s.size===r&&n.done()}).next(()=>s)}newChangeBuffer(e){return new ja(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return za(e).get(It).next(e=>(x(!!e,20021),e))}Dr(e,t){return za(e).put(It,t)}Cr(e,t){if(t){const e=wo(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(ge.min()))return e}return gr.newInvalidDocument(e)}}function Ba(e){return new Ua(e)}class ja extends qa{constructor(e,t){super(),this.Nr=e,this.trackRemovals=t,this.Br=new ds(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new yn((e,t)=>z(e.canonicalString(),t.canonicalString()));return this.changes.forEach((s,i)=>{const o=this.Br.get(s);if(t.push(this.Nr.removeEntry(e,s,o.readTime)),i.isValidDocument()){const a=bo(this.Nr.serializer,i);r=r.add(s.path.popLast());const u=ba(a);n+=u-o.size,t.push(this.Nr.addEntry(e,s,a))}else if(n-=o.size,this.trackRemovals){const n=bo(this.Nr.serializer,i.convertToNoDocument(ge.min()));t.push(this.Nr.addEntry(e,s,n))}}),r.forEach(n=>{t.push(this.Nr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Nr.updateMetadata(e,n)),ke.waitFor(t)}getFromCache(e,t){return this.Nr.vr(e,t).next(e=>(this.Br.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Nr.Mr(e,t).next(({documents:e,Or:t})=>(t.forEach((t,n)=>{this.Br.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function za(e){return cn(e,vt)}function Ga(e){return cn(e,mt)}function $a(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Ka(e,t){const n=t.documentKey.path.toArray();return[e,vo(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Qa(e,t){const n=e.path.toArray(),r=t.path.toArray();let s=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(s=z(n[e],r[e]),s)return s;return s=z(n.length,r.length),s||(s=z(n[n.length-2],r[r.length-2]),s||z(n[n.length-1],r[r.length-1])
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */)}class Wa{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ha{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Hs(n.mutation,e,vn.empty(),me.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Ts()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Ts()){const r=ws();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=ps();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=ws();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Ts()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=ms();const i=vs(),o=vs();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Zs)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),Hs(o.mutation,t,o.mutation.getFieldMask(),me.now())):i.set(t.key,vn.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new Wa(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=vs();let r=new mn((e,t)=>e-t),s=Ts();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||vn.empty();o=s.applyToLocalView(i,o),n.set(e,o);const a=(r.get(s.batchId)||Ts()).add(e);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,u=r.value,c=bs();u.forEach(e=>{if(!s.has(e)){const r=Qs(t.get(e),n.get(e));null!==r&&c.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,c))}return ke.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return(function(e){return te.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Xr(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):ke.resolve(ws());let o=pe,a=s;return i.next(t=>ke.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?ke.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,Ts())).next(e=>({batchId:o,changes:ys(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new te(t)).next(e=>{let t=ps();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=ps();return this.indexManager.getCollectionParents(e,s).next(o=>ke.forEach(o,o=>{const a=(function(e,t){return new Wr(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)})(t,o.child(s));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>{s.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,gr.newInvalidDocument(r)))});let n=ps();return e.forEach((e,r)=>{const i=s.get(e);void 0!==i&&Hs(i.mutation,r,vn.empty(),me.now()),us(t,r)&&(n=n.insert(e,r))}),n})}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ja{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return ke.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(e){return{id:e.id,version:e.version,createTime:Li(e.createTime)}})(t)),ke.resolve()}getNamedQuery(e,t){return ke.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(e){return{name:e.name,query:xo(e.bundledQuery),readTime:Li(e.readTime)}})(t)),ke.resolve()}}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ya{constructor(){this.overlays=new mn(te.comparator),this.qr=new Map}getOverlay(e,t){return ke.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ws();return ke.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),ke.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.qr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),ke.resolve()}getOverlaysForCollection(e,t,n){const r=ws(),s=t.length+1,i=new te(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return ke.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new mn((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=ws(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=ws(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return ke.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new ai(t,n));let s=this.qr.get(t);void 0===s&&(s=Ts(),this.qr.set(t,s)),this.qr.set(t,s.add(n.key))}}
/**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Xa{constructor(){this.sessionToken=Tn.EMPTY_BYTE_STRING}getSessionToken(e){return ke.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ke.resolve()}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Za{constructor(){this.Qr=new yn(eu.$r),this.Ur=new yn(eu.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new eu(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new eu(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new te(new X([])),n=new eu(t,e),r=new eu(t,e+1),s=[];return this.Ur.forEachInRange([n,r],e=>{this.Gr(e),s.push(e.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new te(new X([])),n=new eu(t,e),r=new eu(t,e+1);let s=Ts();return this.Ur.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new eu(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class eu{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return te.comparator(e.key,t.key)||z(e.Yr,t.Yr)}static Kr(e,t){return z(e.Yr,t.Yr)||te.comparator(e.key,t.key)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class tu{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new yn(eu.$r)}checkEmpty(e){return ke.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new ii(s,t,n,r);this.mutationQueue.push(i);for(const t of r)this.Zr=this.Zr.add(new eu(t.key,s)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return ke.resolve(i)}lookupMutationBatch(e,t){return ke.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ei(n),s=r<0?0:r;return ke.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return ke.resolve(0===this.mutationQueue.length?Qe:this.tr-1)}getAllMutationBatches(e){return ke.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new eu(t,0),r=new eu(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([n,r],e=>{const t=this.Xr(e.Yr);s.push(t)}),ke.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new yn(z);return t.forEach(e=>{const t=new eu(e,0),r=new eu(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,r],e=>{n=n.add(e.Yr)})}),ke.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;te.isDocumentKey(s)||(s=s.child(""));const i=new eu(new te(s),0);let o=new yn(z);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Yr)),!0)},i),ke.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){x(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return ke.forEach(t.mutations,r=>{const s=new eu(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new eu(t,0),r=this.Zr.firstAfterOrEqual(n);return ke.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,ke.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class nu{constructor(e){this.ri=e,this.docs=new mn(te.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return ke.resolve(n?n.document.mutableCopy():gr.newInvalidDocument(t))}getEntries(e,t){let n=ms();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():gr.newInvalidDocument(e))}),ke.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let s=ms();const i=t.path,o=new te(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||Ne(Se(o),n)<=0||(r.has(o.key)||us(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return ke.resolve(s)}getAllFromCollectionGroup(e,t,n,r){E(9500)}ii(e,t){return ke.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new ru(this)}getSize(e){return ke.resolve(this.size)}}class ru extends qa{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(n)}),ke.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class su{constructor(e){this.persistence=e,this.si=new ds(e=>jr(e),zr),this.lastRemoteSnapshotVersion=ge.min(),this.highestTargetId=0,this.oi=0,this._i=new Za,this.targetCount=0,this.ai=Sa.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),ke.resolve()}getLastRemoteSnapshotVersion(e){return ke.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ke.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),ke.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),ke.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Sa(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,ke.resolve()}updateTargetData(e,t){return this.Pr(t),ke.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,ke.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.si.forEach((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),ke.waitFor(s).next(()=>r)}getTargetCount(e){return ke.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return ke.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),ke.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),ke.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),ke.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return ke.resolve(n)}containsKey(e,t){return ke.resolve(this._i.containsKey(t))}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class iu{constructor(e,t){this.ui={},this.overlays={},this.ci=new Ke(0),this.li=!1,this.li=!0,this.hi=new Xa,this.referenceDelegate=e(this),this.Pi=new su(this),this.indexManager=new ia,this.remoteDocumentCache=(function(e){return new nu(e)})(e=>this.referenceDelegate.Ti(e)),this.serializer=new yo(t),this.Ii=new Ja(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ya,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new tu(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){v("MemoryPersistence","Starting transaction:",e);const r=new ou(this.ci.next());return this.referenceDelegate.Ei(),n(r).next(e=>this.referenceDelegate.di(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ai(e,t){return ke.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class ou extends De{constructor(e){super(),this.currentSequenceNumber=e}}class au{constructor(e){this.persistence=e,this.Ri=new Za,this.Vi=null}static mi(e){return new au(e)}get fi(){if(this.Vi)return this.Vi;throw E(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),ke.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),ke.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),ke.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ke.forEach(this.fi,n=>{const r=te.fromPath(n);return this.gi(e,r).next(e=>{e||t.removeEntry(r,ge.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return ke.or([()=>ke.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class uu{constructor(e,t){this.persistence=e,this.pi=new ds(e=>Xe(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=Va(this,t)}static mi(e,t){return new uu(e,t)}Ei(){}di(e){return ke.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return ke.forEach(this.pi,(n,r)=>this.br(e,n,r).next(e=>e?ke.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ii(e,r=>this.br(e,r,t).next(e=>{e||(n++,s.removeEntry(r,ge.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),ke.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ke.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),ke.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),ke.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Xn(e.data.value)),t}br(e,t,n){return ke.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return ke.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class cu{constructor(e){this.serializer=e}k(e,t,n,r){const s=new Oe("createOrUpgrade",t);n<1&&r>=1&&((function(e){e.createObjectStore(rt)})(e),(function(e){e.createObjectStore(it,{keyPath:"userId"});e.createObjectStore(ot,{keyPath:at,autoIncrement:!0}).createIndex(ut,ct,{unique:!0}),e.createObjectStore(ft)})(e),lu(e),(function(e){e.createObjectStore(nt)})(e));let i=ke.resolve();return n<3&&r>=3&&(0!==n&&((function(e){e.deleteObjectStore(St),e.deleteObjectStore(_t),e.deleteObjectStore(At)})(e),lu(e)),i=i.next(()=>(function(e){const t=e.store(At),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ge.min().toTimestamp(),targetCount:0};return t.put(Dt,n)})(s))),n<4&&r>=4&&(0!==n&&(i=i.next(()=>(function(e,t){return t.store(ot).J().next(n=>{e.deleteObjectStore(ot),e.createObjectStore(ot,{keyPath:at,autoIncrement:!0}).createIndex(ut,ct,{unique:!0});const r=t.store(ot),s=n.map(e=>r.put(e));return ke.waitFor(s)})})(e,s))),i=i.next(()=>{!(function(e){e.createObjectStore(Ot,{keyPath:"clientId"})})(e)})),n<5&&r>=5&&(i=i.next(()=>this.yi(s))),n<6&&r>=6&&(i=i.next(()=>((function(e){e.createObjectStore(vt)})(e),this.wi(s)))),n<7&&r>=7&&(i=i.next(()=>this.Si(s))),n<8&&r>=8&&(i=i.next(()=>this.bi(e,s))),n<9&&r>=9&&(i=i.next(()=>{!(function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&r>=10&&(i=i.next(()=>this.Di(s))),n<11&&r>=11&&(i=i.next(()=>{!(function(e){e.createObjectStore(Mt,{keyPath:"bundleId"})})(e),(function(e){e.createObjectStore(Rt,{keyPath:"name"})})(e)})),n<12&&r>=12&&(i=i.next(()=>{!(function(e){const t=e.createObjectStore(Kt,{keyPath:Qt});t.createIndex(Wt,Ht,{unique:!1}),t.createIndex(Jt,Yt,{unique:!1})})(e)})),n<13&&r>=13&&(i=i.next(()=>(function(e){const t=e.createObjectStore(mt,{keyPath:gt});t.createIndex(pt,yt),t.createIndex(wt,bt)})(e)).next(()=>this.Ci(e,s)).next(()=>e.deleteObjectStore(nt))),n<14&&r>=14&&(i=i.next(()=>this.Fi(e,s))),n<15&&r>=15&&(i=i.next(()=>(function(e){e.createObjectStore(Vt,{keyPath:"indexId",autoIncrement:!0}).createIndex(Ft,"collectionGroup",{unique:!1});e.createObjectStore(Lt,{keyPath:qt}).createIndex(Ut,Bt,{unique:!1});e.createObjectStore(jt,{keyPath:zt}).createIndex(Gt,$t,{unique:!1})})(e))),n<16&&r>=16&&(i=i.next(()=>{t.objectStore(Lt).clear()}).next(()=>{t.objectStore(jt).clear()})),n<17&&r>=17&&(i=i.next(()=>{!(function(e){e.createObjectStore(Xt,{keyPath:"name"})})(e)})),n<18&&r>=18&&(0,l.isSafariOrWebkit)()&&(i=i.next(()=>{t.objectStore(Lt).clear()}).next(()=>{t.objectStore(jt).clear()})),i}wi(e){let t=0;return e.store(nt).ee((e,n)=>{t+=ba(n)}).next(()=>{const n={byteSize:t};return e.store(vt).put(It,n)})}yi(e){const t=e.store(it),n=e.store(ot);return t.J().next(t=>ke.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,Qe],[t.userId,t.lastAcknowledgedBatchId]);return n.J(ut,r).next(n=>ke.forEach(n,n=>{x(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=To(this.serializer,n);return wa(e,t.userId,r).next(()=>{})}))}))}Si(e){const t=e.store(St),n=e.store(nt);return e.store(At).get(Dt).next(e=>{const r=[];return n.ee((n,s)=>{const i=new X(n),o=(function(e){return[0,Xe(e)]})(i);r.push(t.get(o).next(n=>n?ke.resolve():(n=>t.put({targetId:0,path:Xe(n),sequenceNumber:e.highestListenSequenceNumber}))(i)))}).next(()=>ke.waitFor(r))})}bi(e,t){e.createObjectStore(kt,{keyPath:Pt});const n=t.store(kt),r=new oa,s=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:Xe(r)})}};return t.store(nt).ee({X:!0},(e,t)=>{const n=new X(e);return s(n.popLast())}).next(()=>t.store(ft).ee({X:!0},([e,t,n],r)=>{const i=tt(t);return s(i.popLast())}))}Di(e){const t=e.store(_t);return t.ee((e,n)=>{const r=Eo(n),s=So(this.serializer,r);return t.put(s)})}Ci(e,t){const n=t.store(nt),r=[];return n.ee((e,n)=>{const s=t.store(mt),i=(function(e){return e.document?new te(X.fromString(e.document.name).popFirst(5)):e.noDocument?te.fromSegments(e.noDocument.path):e.unknownDocument?te.fromSegments(e.unknownDocument.path):E(36783)}
/**
          * @license
          * Copyright 2017 Google LLC
          *
          * Licensed under the Apache License, Version 2.0 (the "License");
          * you may not use this file except in compliance with the License.
          * You may obtain a copy of the License at
          *
          *   http://www.apache.org/licenses/LICENSE-2.0
          *
          * Unless required by applicable law or agreed to in writing, software
          * distributed under the License is distributed on an "AS IS" BASIS,
          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          * See the License for the specific language governing permissions and
          * limitations under the License.
          */)(n).path.toArray(),o={prefixPath:i.slice(0,i.length-2),collectionGroup:i[i.length-2],documentId:i[i.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(s.put(o))}).next(()=>ke.waitFor(r))}Fi(e,t){const n=t.store(ot),r=Ba(this.serializer),s=new iu(au.mi,this.serializer.yt);return n.J().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??Ts();To(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),ke.forEach(n,(e,n)=>{const i=new g(n),o=Oo.wt(this.serializer,i),a=s.getIndexManager(i),u=va.wt(i,this.serializer,a,s.referenceDelegate);return new Ha(r,u,o,a).recalculateAndSaveOverlaysForDocumentKeys(new un(t,Ke.ce),e).next()})})}}function lu(e){e.createObjectStore(St,{keyPath:xt}).createIndex(Nt,Ct,{unique:!0}),e.createObjectStore(_t,{keyPath:"targetId"}).createIndex(Tt,Et,{unique:!0}),e.createObjectStore(At)}const hu="IndexedDbPersistence",du=18e5,fu=5e3,mu="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",gu="main";class pu{constructor(e,t,n,r,s,i,o,a,u,c,l=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Mi=s,this.window=i,this.document=o,this.xi=u,this.Oi=c,this.Ni=l,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=e=>Promise.resolve(),!pu.v())throw new A(D.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Fa(this,r),this.$i=t+gu,this.serializer=new yo(a),this.Ui=new Me(this.$i,this.Ni,new cu(this.serializer)),this.hi=new Ro,this.Pi=new xa(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Ba(this.serializer),this.Ii=new Ao,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,!1===c&&I(hu,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new A(D.FAILED_PRECONDITION,mu);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Pi.getHighestSequenceNumber(e))}).then(e=>{this.ci=new Ke(e,this.xi)}).then(()=>{this.li=!0}).catch(e=>(this.Ui&&this.Ui.close(),Promise.reject(e)))}Ji(e){return this.Qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget(async()=>{this.started&&await this.Wi()}))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>wu(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Hi(e).next(e=>{e||(this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)))})}).next(()=>this.Yi(e)).next(t=>this.isPrimary&&!t?this.Zi(e).next(()=>!1):!!t&&this.Xi(e).next(()=>!0))).catch(e=>{if(Le(e))return v(hu,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return v(hu,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable(()=>this.Qi(e)),this.isPrimary=e})}Hi(e){return yu(e).get(st).next(e=>ke.resolve(this.es(e)))}ts(e){return wu(e).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,du)){this.qi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=cn(e,Ot);return t.J().next(e=>{const n=this.ss(e,du),r=e.filter(e=>-1===n.indexOf(e));return ke.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Ki)for(const t of e)this.Ki.removeItem(this._s(t.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Wi().then(()=>this.ns()).then(()=>this.ji()))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?ke.resolve(!0):yu(e).get(st).next(t=>{if(null!==t&&this.rs(t.leaseTimestampMs,fu)&&!this.us(t.ownerId)){if(this.es(t)&&this.networkEnabled)return!0;if(!this.es(t)){if(!t.allowTabSynchronization)throw new A(D.FAILED_PRECONDITION,mu);return!1}}return!(!this.networkEnabled||!this.inForeground)||wu(e).J().next(e=>void 0===this.ss(e,fu).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&v(hu,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[rt,Ot],e=>{const t=new un(e,Ke.ce);return this.Zi(t).next(()=>this.ts(t))}),this.Ui.close(),this.Ps()}ss(e,t){return e.filter(e=>this.rs(e.updateTimeMs,t)&&!this.us(e.clientId))}Ts(){return this.runTransaction("getActiveClients","readonly",e=>wu(e).J().next(e=>this.ss(e,du).map(e=>e.clientId)))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,t){return va.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new ca(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Oo.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,t,n){v(hu,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",s=(function(e){return 18===e?an:17===e?on:16===e?sn:15===e?rn:14===e?nn:13===e?tn:12===e?en:11===e?Zt:void E(60245)})(this.Ni);let i;return this.Ui.runTransaction(e,r,s,r=>(i=new un(r,this.ci?this.ci.next():Ke.ce),"readwrite-primary"===t?this.Hi(i).next(e=>!!e||this.Yi(i)).next(t=>{if(!t)throw I(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable(()=>this.Qi(!1)),new A(D.FAILED_PRECONDITION,Ce);return n(i)}).next(e=>this.Xi(i).next(()=>e)):this.Is(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Is(e){return yu(e).get(st).next(e=>{if(null!==e&&this.rs(e.leaseTimestampMs,fu)&&!this.us(e.ownerId)&&!this.es(e)&&!(this.Oi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new A(D.FAILED_PRECONDITION,mu)})}Xi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return yu(e).put(st,t)}static v(){return Me.v()}Zi(e){const t=yu(e);return t.get(st).next(e=>this.es(e)?(v(hu,"Releasing primary lease."),t.delete(st)):ke.resolve())}rs(e,t){const n=Date.now();return!(e<n-t||e>n&&(I(`Detected an update time that is in the future: ${e} > ${n}`),1))}Gi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Li=()=>{this.Mi.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.Wi()))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground="visible"===this.document.visibilityState)}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){"function"==typeof this.window?.addEventListener&&(this.Bi=()=>{this.cs();const e=/(?:Version|Mobile)\/1[456]/;(0,l.isSafari)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){try{const t=null!==this.Ki?.getItem(this._s(e));return v(hu,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return I(hu,"Failed to get zombied client id.",e),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){I("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch(e){}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function yu(e){return cn(e,rt)}function wu(e){return cn(e,Ot)}function bu(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}class vu{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=r}static As(e,t){let n=Ts(),r=Ts();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new vu(e,t.fromCache,n,r)}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Iu{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class _u{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(0,l.isSafari)()?8:Re((0,l.getUA)())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.ys(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ws(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Iu;return this.Ss(e,t,n).next(r=>{if(s.result=r,this.Vs)return this.bs(e,t,n,r.size)})}).next(()=>s.result)}bs(e,t,n,r){return n.documentReadCount<this.fs?(w()<=c.LogLevel.DEBUG&&v("QueryEngine","SDK will not create cache indexes for query:",as(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),ke.resolve()):(w()<=c.LogLevel.DEBUG&&v("QueryEngine","Query:",as(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(w()<=c.LogLevel.DEBUG&&v("QueryEngine","The SDK decides to create cache indexes for query:",as(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,es(t))):ke.resolve())}ys(e,t){if(Yr(t))return ke.resolve(null);let n=es(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=ss(t,null,"F"),n=es(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const s=Ts(...r);return this.ps.getDocuments(e,s).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const i=this.Ds(t,r);return this.Cs(t,i,s,n.readTime)?this.ys(e,ss(t,null,"F")):this.vs(e,i,t,n)}))})))}ws(e,t,n,r){return Yr(t)||r.isEqual(ge.min())?ke.resolve(null):this.ps.getDocuments(e,n).next(s=>{const i=this.Ds(t,s);return this.Cs(t,i,n,r)?ke.resolve(null):(w()<=c.LogLevel.DEBUG&&v("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),as(t)),this.vs(e,i,t,Ee(r,pe)).next(e=>e))})}Ds(e,t){let n=new yn(ls(e));return t.forEach((t,r)=>{us(e,r)&&(n=n.add(r))}),n}Cs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(e,t,n){return w()<=c.LogLevel.DEBUG&&v("QueryEngine","Using full collection scan to execute query:",as(t)),this.ps.getDocumentsMatchingQuery(e,t,xe.min(),n)}vs(e,t,n,r){return this.ps.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Tu="LocalStore",Eu=3e8;class Su{constructor(e,t,n,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new mn(z),this.xs=new ds(e=>jr(e),zr),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ha(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function xu(e,t,n,r){return new Su(e,t,n,r)}async function Nu(e,t){const n=C(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=Ts();for(const e of r){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:s,addedBatchIds:i}))})})}function Cu(e,t){const n=C(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,r){const s=n.batch,i=s.keys();let o=ke.resolve();return i.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);x(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))})(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,(function(e){let t=Ts();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t})(t))).next(()=>n.localDocuments.getDocuments(e,r))})}function Du(e){const t=C(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function Au(e,t){const n=C(e),r=t.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const o=[];t.targetChanges.forEach((i,a)=>{const u=s.get(a);if(!u)return;o.push(n.Pi.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,i.addedDocuments,a)));let c=u.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?c=c.withResumeToken(Tn.EMPTY_BYTE_STRING,ge.min()).withLastLimboFreeSnapshotVersion(ge.min()):i.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(i.resumeToken,r)),s=s.insert(a,c),(function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;if(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=Eu)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0})(u,c,i)&&o.push(n.Pi.updateTargetData(e,c))});let a=ms(),u=Ts();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(ku(e,i,t.documentUpdates).next(e=>{a=e.ks,u=e.qs})),!r.isEqual(ge.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return ke.waitFor(o).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,u)).next(()=>a)}).then(e=>(n.Ms=s,e))}function ku(e,t,n){let r=Ts(),s=Ts();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=ms();return n.forEach((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(ge.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):v(Tu,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{ks:r,qs:s}})}function Pu(e,t){const n=C(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=Qe),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}function Ou(e,t){const n=C(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Pi.getTargetData(e,t).next(s=>s?(r=s,ke.resolve(r)):n.Pi.allocateTargetId(e).next(s=>(r=new po(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.Ms.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}async function Mu(e,t,n){const r=C(e),s=r.Ms.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(e){if(!Le(e))throw e;v(Tu,`Failed to update sequence numbers for target ${t}: ${e}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function Ru(e,t,n){const r=C(e);let s=ge.min(),i=Ts();return r.persistence.runTransaction("Execute query","readwrite",e=>(function(e,t,n){const r=C(e),s=r.xs.get(n);return void 0!==s?ke.resolve(r.Ms.get(s)):r.Pi.getTargetData(t,n)})(r,e,es(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.Fs.getDocumentsMatchingQuery(e,t,n?s:ge.min(),n?i:Ts())).next(e=>(Lu(r,cs(t),e),{documents:e,Qs:i})))}function Vu(e,t){const n=C(e),r=C(n.Pi),s=n.Ms.get(t);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",e=>r.At(e,t).next(e=>e?e.target:null))}function Fu(e,t){const n=C(e),r=n.Os.get(t)||ge.min();return n.persistence.runTransaction("Get new document changes","readonly",e=>n.Ns.getAllFromCollectionGroup(e,t,Ee(r,pe),Number.MAX_SAFE_INTEGER)).then(e=>(Lu(n,t,e),e))}function Lu(e,t,n){let r=e.Os.get(t)||ge.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Os.set(t,r)}async function qu(e,t,n,r){const s=C(e);let i=Ts(),o=ms();for(const e of n){const n=t.$s(e.metadata.name);e.document&&(i=i.add(n));const r=t.Us(e);r.setReadTime(t.Ks(e.metadata.readTime)),o=o.insert(n,r)}const a=s.Ns.newChangeBuffer({trackRemovals:!0}),u=await Ou(s,(function(e){return es(Jr(X.fromString(`__bundle__/docs/${e}`)))})(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",e=>ku(e,a,o).next(t=>(a.apply(e),t)).next(t=>s.Pi.removeMatchingKeysForTargetId(e,u.targetId).next(()=>s.Pi.addMatchingKeys(e,i,u.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(e,t.ks,t.qs)).next(()=>t.ks)))}async function Uu(e,t,n=Ts()){const r=await Ou(e,es(xo(t.bundledQuery))),s=C(e);return s.persistence.runTransaction("Save named query","readwrite",e=>{const i=Li(t.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Ii.saveNamedQuery(e,t);const o=r.withResumeToken(Tn.EMPTY_BYTE_STRING,i);return s.Ms=s.Ms.insert(o.targetId,o),s.Pi.updateTargetData(e,o).next(()=>s.Pi.removeMatchingKeysForTargetId(e,r.targetId)).next(()=>s.Pi.addMatchingKeys(e,n,r.targetId)).next(()=>s.Ii.saveNamedQuery(e,t))})}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Bu="firestore_clients";function ju(e,t){return`${Bu}_${e}_${t}`}const zu="firestore_mutations";function Gu(e,t,n){let r=`${zu}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}const $u="firestore_targets";function Ku(e,t){return`${$u}_${e}_${t}`}
/**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Qu="SharedClientState";class Wu{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static Ws(e,t,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new A(r.error.code,r.error.message))),i?new Wu(e,t,r.state,s):(I(Qu,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Hu{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Ws(e,t){const n=JSON.parse(t);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new A(n.error.code,n.error.message))),s?new Hu(e,n.state,r):(I(Qu,`Failed to parse target state for ID '${e}': ${t}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ju{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ws(e,t){const n=JSON.parse(t);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=Ss();for(let e=0;r&&e<n.activeTargetIds.length;++e)r=Je(n.activeTargetIds[e]),s=s.add(n.activeTargetIds[e]);return r?new Ju(e,s):(I(Qu,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Yu{constructor(e,t){this.clientId=e,this.onlineState=t}static Ws(e){const t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new Yu(t.clientId,t.onlineState):(I(Qu,`Failed to parse online state: ${e}`),null)}}class Xu{constructor(){this.activeTargetIds=Ss()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Zu{constructor(e,t,n,r,s){this.window=e,this.Mi=t,this.persistenceKey=n,this.Js=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new mn(z),this.started=!1,this.Xs=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.eo=ju(this.persistenceKey,this.Js),this.no=(function(e){return`firestore_sequence_number_${e}`})(this.persistenceKey),this.Zs=this.Zs.insert(this.Js,new Xu),this.ro=new RegExp(`^${Bu}_${i}_([^_]*)$`),this.io=new RegExp(`^${zu}_${i}_(\\d+)(?:_(.*))?$`),this.so=new RegExp(`^${$u}_${i}_(\\d+)$`),this.oo=(function(e){return`firestore_online_state_${e}`})(this.persistenceKey),this._o=(function(e){return`firestore_bundle_loaded_v2_${e}`})(this.persistenceKey),this.window.addEventListener("storage",this.Hs)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ts();for(const t of e){if(t===this.Js)continue;const e=this.getItem(ju(this.persistenceKey,t));if(e){const n=Ju.Ws(t,e);n&&(this.Zs=this.Zs.insert(n.clientId,n))}}this.ao();const t=this.storage.getItem(this.oo);if(t){const e=this.uo(t);e&&this.co(e)}for(const e of this.Xs)this.Ys(e);this.Xs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.no,JSON.stringify(e))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(e){let t=!1;return this.Zs.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.ho(e,"pending")}updateMutationState(e,t,n){this.ho(e,t,n),this.Po(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const t=this.storage.getItem(Ku(this.persistenceKey,e));if(t){const r=Hu.Ws(e,t);r&&(n=r.state)}}return t&&this.To.zs(e),this.ao(),n}removeLocalQueryTarget(e){this.To.js(e),this.ao()}isLocalQueryTarget(e){return this.To.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Ku(this.persistenceKey,e))}updateQueryState(e,t,n){this.Io(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.Po(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.Eo(e)}notifyBundleLoaded(e){this.Ao(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return v(Qu,"READ",e,t),t}setItem(e,t){v(Qu,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){v(Qu,"REMOVE",e),this.storage.removeItem(e)}Ys(e){const t=e;if(t.storageArea===this.storage){if(v(Qu,"EVENT",t.key,t.newValue),t.key===this.eo)return void I("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable(async()=>{if(this.started){if(null!==t.key)if(this.ro.test(t.key)){if(null==t.newValue){const e=this.Ro(t.key);return this.Vo(e,null)}{const e=this.mo(t.key,t.newValue);if(e)return this.Vo(e.clientId,e)}}else if(this.io.test(t.key)){if(null!==t.newValue){const e=this.fo(t.key,t.newValue);if(e)return this.po(e)}}else if(this.so.test(t.key)){if(null!==t.newValue){const e=this.yo(t.key,t.newValue);if(e)return this.wo(e)}}else if(t.key===this.oo){if(null!==t.newValue){const e=this.uo(t.newValue);if(e)return this.co(e)}}else if(t.key===this.no){const e=(function(e){let t=Ke.ce;if(null!=e)try{const n=JSON.parse(e);x("number"==typeof n,30636,{So:e}),t=n}catch(e){I(Qu,"Failed to read sequence number from WebStorage",e)}return t})(t.newValue);e!==Ke.ce&&this.sequenceNumberHandler(e)}else if(t.key===this._o){const e=this.bo(t.newValue);await Promise.all(e.map(e=>this.syncEngine.Do(e)))}}else this.Xs.push(t)})}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(e,t,n){const r=new Wu(this.currentUser,e,t,n),s=Gu(this.persistenceKey,this.currentUser,e);this.setItem(s,r.Gs())}Po(e){const t=Gu(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Eo(e){const t={clientId:this.Js,onlineState:e};this.storage.setItem(this.oo,JSON.stringify(t))}Io(e,t,n){const r=Ku(this.persistenceKey,e),s=new Hu(e,t,n);this.setItem(r,s.Gs())}Ao(e){const t=JSON.stringify(Array.from(e));this.setItem(this._o,t)}Ro(e){const t=this.ro.exec(e);return t?t[1]:null}mo(e,t){const n=this.Ro(e);return Ju.Ws(n,t)}fo(e,t){const n=this.io.exec(e),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return Wu.Ws(new g(s),r,t)}yo(e,t){const n=this.so.exec(e),r=Number(n[1]);return Hu.Ws(r,t)}uo(e){return Yu.Ws(e)}bo(e){return JSON.parse(e)}async po(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Co(e.batchId,e.state,e.error);v(Qu,`Ignoring mutation for non-active user ${e.user.uid}`)}wo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Vo(e,t){const n=t?this.Zs.insert(e,t):this.Zs.remove(e),r=this.lo(this.Zs),s=this.lo(n),i=[],o=[];return s.forEach(e=>{r.has(e)||i.push(e)}),r.forEach(e=>{s.has(e)||o.push(e)}),this.syncEngine.Fo(i,o).then(()=>{this.Zs=n})}co(e){this.Zs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}lo(e){let t=Ss();return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class ec{constructor(){this.Mo=new Xu,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Xu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class tc{Oo(e){}shutdown(){}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const nc="ConnectivityMonitor";class rc{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){v(nc,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){v(nc,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */let sc=null;function ic(){return null===sc?sc=268435456+Math.round(2147483648*Math.random()):sc++,"0x"+sc.toString(16)
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}const oc="RestConnection",ac={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class uc{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===Vn?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(e,t,n,r,s){const i=ic(),o=this.zo(e,t.toUriEncodedString());v(oc,`Sending RPC '${e}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,r,s);const{host:u}=new URL(o),c=(0,l.isCloudWorkstation)(u);return this.Jo(e,o,a,n,c).then(t=>(v(oc,`Received RPC '${e}' ${i}: `,t),t),t=>{throw _(oc,`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",n),t})}Ho(e,t,n,r,s,i){return this.Go(e,t,n,r,s)}jo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+p,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=ac[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class cc{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const lc="WebChannelConnection";class hc extends uc{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,r,s){const i=ic();return new Promise((s,o)=>{const a=new d.XhrIo;a.setWithCredentials(!0),a.listenOnce(d.EventType.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case d.ErrorCode.NO_ERROR:const t=a.getResponseJson();v(lc,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case d.ErrorCode.TIMEOUT:v(lc,`RPC '${e}' ${i} timed out`),o(new A(D.DEADLINE_EXCEEDED,"Request time out"));break;case d.ErrorCode.HTTP_ERROR:const n=a.getStatus();if(v(lc,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=(function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(t)>=0?t:D.UNKNOWN})(t.status);o(new A(e,t.message))}else o(new A(D.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new A(D.UNAVAILABLE,"Connection failed."));break;default:E(9055,{l_:e,streamId:i,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{v(lc,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(r);v(lc,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",u,n,15)})}T_(e,t,n){const r=ic(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=(0,d.createWebChannelTransport)(),o=(0,d.getStatEventTarget)(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(a.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const c=s.join("");v(lc,`Creating RPC '${e}' stream ${r}: ${c}`,a);const l=i.createWebChannel(c,a);this.I_(l);let h=!1,f=!1;const m=new cc({Yo:t=>{f?v(lc,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(h||(v(lc,`Opening RPC '${e}' stream ${r} transport.`),l.open(),h=!0),v(lc,`RPC '${e}' stream ${r} sending:`,t),l.send(t))},Zo:()=>l.close()}),g=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return g(l,d.WebChannel.EventType.OPEN,()=>{f||(v(lc,`RPC '${e}' stream ${r} transport opened.`),m.o_())}),g(l,d.WebChannel.EventType.CLOSE,()=>{f||(f=!0,v(lc,`RPC '${e}' stream ${r} transport closed`),m.a_(),this.E_(l))}),g(l,d.WebChannel.EventType.ERROR,t=>{f||(f=!0,_(lc,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),m.a_(new A(D.UNAVAILABLE,"The operation could not be completed")))}),g(l,d.WebChannel.EventType.MESSAGE,t=>{if(!f){const n=t.data[0];x(!!n,16349);const s=n,i=s?.error||s[0]?.error;if(i){v(lc,`RPC '${e}' stream ${r} received error:`,i);const t=i.status;let n=(function(e){const t=li[e];if(void 0!==t)return fi(t)})(t),s=i.message;void 0===n&&(n=D.INTERNAL,s="Unknown error status: "+t+" with message "+i.message),f=!0,m.a_(new A(n,s)),l.close()}else v(lc,`RPC '${e}' stream ${r} received:`,n),m.u_(n)}}),g(o,d.Event.STAT_EVENT,t=>{t.stat===d.Stat.PROXY?v(lc,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===d.Stat.NOPROXY&&v(lc,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{m.__()},0),m}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function dc(){return"undefined"!=typeof window?window:null}function fc(){return"undefined"!=typeof document?document:null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function mc(e){return new Oi(e,!0)}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class gc{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=r,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&v("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const pc="PersistentStream";class yc{constructor(e,t,n,r,s,i,o,a){this.Mi=e,this.S_=n,this.b_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new gc(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(I(t.toString()),I("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===D.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new A(D.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return v(pc,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(v(pc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class wc extends yc{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Yi(this.serializer,e),n=(function(e){if(!("targetChange"in e))return ge.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?ge.min():t.readTime?Li(t.readTime):ge.min()})(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=Ki(this.serializer),t.addTarget=(function(e,t){let n;const r=t.target;if(n=Gr(r)?{documents:to(e,r)}:{query:no(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Vi(e,t.resumeToken);const r=Mi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(ge.min())>0){n.readTime=Ri(e,t.snapshotVersion.toTimestamp());const r=Mi(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n})(this.serializer,e);const n=io(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=Ki(this.serializer),t.removeTarget=e,this.q_(t)}}class bc extends yc{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return x(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,x(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){x(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=eo(e.writeResults,e.commitTime),n=Li(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Ki(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>Xi(this.serializer,e))};this.q_(t)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class vc{}class Ic extends vc{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new A(D.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Go(e,Ui(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new A(D.UNKNOWN,e.toString())})}Ho(e,t,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Ho(e,Ui(t,n),r,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new A(D.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class _c{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(I(t),this.aa=!1):v("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Tc="RemoteStore";class Ec{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{Oc(this)&&(v(Tc,"Restarting streams for network reachability change."),await(async function(e){const t=C(e);t.Ea.add(4),await xc(t),t.Ra.set("Unknown"),t.Ea.delete(4),await Sc(t)})(this))})}),this.Ra=new _c(n,r)}}async function Sc(e){if(Oc(e))for(const t of e.da)await t(!0)}async function xc(e){for(const t of e.da)await t(!1)}function Nc(e,t){const n=C(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),Pc(n)?kc(n):Xc(n).O_()&&Dc(n,t))}function Cc(e,t){const n=C(e),r=Xc(n);n.Ia.delete(t),r.O_()&&Ac(n,t),0===n.Ia.size&&(r.O_()?r.L_():Oc(n)&&n.Ra.set("Unknown"))}function Dc(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(ge.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Xc(e).Y_(t)}function Ac(e,t){e.Va.Ue(t),Xc(e).Z_(t)}function kc(e){e.Va=new Ni({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Xc(e).start(),e.Ra.ua()}function Pc(e){return Oc(e)&&!Xc(e).x_()&&e.Ia.size>0}function Oc(e){return 0===C(e).Ea.size}function Mc(e){e.Va=void 0}async function Rc(e){e.Ra.set("Online")}async function Vc(e){e.Ia.forEach((t,n)=>{Dc(e,t)})}async function Fc(e,t){Mc(e),Pc(e)?(e.Ra.ha(t),kc(e)):e.Ra.set("Unknown")}async function Lc(e,t,n){if(e.Ra.set("Online"),t instanceof Si&&2===t.state&&t.cause)try{await(async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.Va.removeTarget(r))})(e,t)}catch(n){v(Tc,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await qc(e,n)}else if(t instanceof Ti?e.Va.Ze(t):t instanceof Ei?e.Va.st(t):e.Va.tt(t),!n.isEqual(ge.min()))try{const t=await Du(e.localStore);n.compareTo(t)>=0&&await(function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ia.get(r);s&&e.Ia.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(Tn.EMPTY_BYTE_STRING,r.snapshotVersion)),Ac(e,t);const s=new po(r.target,t,n,r.sequenceNumber);Dc(e,s)}),e.remoteSyncer.applyRemoteEvent(n)})(e,n)}catch(t){v(Tc,"Failed to raise snapshot:",t),await qc(e,t)}}async function qc(e,t,n){if(!Le(t))throw t;e.Ea.add(1),await xc(e),e.Ra.set("Offline"),n||(n=()=>Du(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{v(Tc,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await Sc(e)})}function Uc(e,t){return t().catch(n=>qc(e,n,t))}async function Bc(e){const t=C(e),n=Zc(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Qe;for(;jc(t);)try{const e=await Pu(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,zc(t,e)}catch(e){await qc(t,e)}Gc(t)&&$c(t)}function jc(e){return Oc(e)&&e.Ta.length<10}function zc(e,t){e.Ta.push(t);const n=Zc(e);n.O_()&&n.X_&&n.ea(t.mutations)}function Gc(e){return Oc(e)&&!Zc(e).x_()&&e.Ta.length>0}function $c(e){Zc(e).start()}async function Kc(e){Zc(e).ra()}async function Qc(e){const t=Zc(e);for(const n of e.Ta)t.ea(n.mutations)}async function Wc(e,t,n){const r=e.Ta.shift(),s=oi.from(r,t,n);await Uc(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await Bc(e)}async function Hc(e,t){t&&Zc(e).X_&&await(async function(e,t){if((function(e){return di(e)&&e!==D.ABORTED})(t.code)){const n=e.Ta.shift();Zc(e).B_(),await Uc(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await Bc(e)}})(e,t),Gc(e)&&$c(e)}async function Jc(e,t){const n=C(e);n.asyncQueue.verifyOperationInProgress(),v(Tc,"RemoteStore received new credentials");const r=Oc(n);n.Ea.add(3),await xc(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await Sc(n)}async function Yc(e,t){const n=C(e);t?(n.Ea.delete(2),await Sc(n)):t||(n.Ea.add(2),await xc(n),n.Ra.set("Unknown"))}function Xc(e){return e.ma||(e.ma=(function(e,t,n){const r=C(e);return r.sa(),new wc(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)
/**
    * @license
    * Copyright 2018 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */})(e.datastore,e.asyncQueue,{Xo:Rc.bind(null,e),t_:Vc.bind(null,e),r_:Fc.bind(null,e),H_:Lc.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),Pc(e)?kc(e):e.Ra.set("Unknown")):(await e.ma.stop(),Mc(e))})),e.ma}function Zc(e){return e.fa||(e.fa=(function(e,t,n){const r=C(e);return r.sa(),new bc(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)})(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:Kc.bind(null,e),r_:Hc.bind(null,e),ta:Qc.bind(null,e),na:Wc.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await Bc(e)):(await e.fa.stop(),e.Ta.length>0&&(v(Tc,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}class el{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new k,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,o=new el(e,t,i,r,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new A(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function tl(e,t){if(I("AsyncQueue",`${t}: ${e}`),Le(e))return new A(D.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class nl{static emptySet(e){return new nl(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||te.comparator(t.key,n.key):(e,t)=>te.comparator(e.key,t.key),this.keyedMap=ps(),this.sortedSet=new mn(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof nl))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new nl;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class rl{constructor(){this.ga=new mn(te.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):E(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class sl{constructor(e,t,n,r,s,i,o,a,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new sl(e,t,nl.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&is(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class il{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class ol{constructor(){this.queries=al(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!(function(e,t){const n=C(e),r=n.queries;n.queries=al(),r.forEach((e,n)=>{for(const e of n.Sa)e.onError(t)})})(this,new A(D.ABORTED,"Firestore shutting down"))}}function al(){return new ds(e=>os(e),is)}async function ul(e,t){const n=C(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new il,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(e){const n=tl(e,`Initialization of query '${as(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,i),i.Sa.push(t),t.va(n.onlineState),i.wa&&t.Fa(i.wa)&&dl(n)}async function cl(e,t){const n=C(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function ll(e,t){const n=C(e);let r=!1;for(const e of t){const t=e.query,s=n.queries.get(t);if(s){for(const t of s.Sa)t.Fa(e)&&(r=!0);s.wa=e}}r&&dl(n)}function hl(e,t,n){const r=C(e),s=r.queries.get(t);if(s)for(const e of s.Sa)e.onError(n);r.queries.delete(t)}function dl(e){e.Ca.forEach(e=>{e.next()})}var fl,ml;(ml=fl||(fl={})).Ma="default",ml.Cache="cache";class gl{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new sl(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=sl.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==fl.Cache}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class pl{constructor(e,t){this.Qa=e,this.byteLength=t}$a(){return"metadata"in this.Qa}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class yl{constructor(e){this.serializer=e}$s(e){return zi(this.serializer,e)}Us(e){return e.metadata.exists?Hi(this.serializer,e.document,!1):gr.newNoDocument(this.$s(e.metadata.name),this.Ks(e.metadata.readTime))}Ks(e){return Li(e)}}class wl{constructor(e,t){this.Ua=e,this.serializer=t,this.Ka=[],this.Wa=[],this.collectionGroups=new Set,this.progress=bl(e)}get queries(){return this.Ka}get documents(){return this.Wa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Qa.namedQuery)this.Ka.push(e.Qa.namedQuery);else if(e.Qa.documentMetadata){this.Wa.push({metadata:e.Qa.documentMetadata}),e.Qa.documentMetadata.exists||++t;const n=X.fromString(e.Qa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Qa.document&&(this.Wa[this.Wa.length-1].document=e.Qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,n=new yl(this.serializer);for(const r of e)if(r.metadata.queries){const e=n.$s(r.metadata.name);for(const n of r.metadata.queries){const r=(t.get(n)||Ts()).add(e);t.set(n,r)}}return t}async ja(e){const t=await qu(e,new yl(this.serializer),this.Wa,this.Ua.id),n=this.za(this.documents);for(const t of this.Ka)await Uu(e,t,n.get(t.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function bl(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class vl{constructor(e){this.key=e}}class Il{constructor(e){this.key=e}}class _l{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Ts(),this.mutatedKeys=Ts(),this.eu=ls(e),this.tu=new nl(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new rl,r=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,u="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const c=r.get(e),l=us(this.query,t)?t:null,h=!!c&&this.mutatedKeys.has(c.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;c&&l?c.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.su(c,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.eu(l,a)>0||u&&this.eu(l,u)<0)&&(o=!0)):!c&&l?(n.track({type:0,doc:l}),f=!0):c&&!l&&(n.track({type:1,doc:c}),f=!0,(a||u)&&(o=!0)),f&&(l?(i=i.add(l),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{tu:i,iu:n,Cs:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((e,t)=>(function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return E(20277,{Rt:e})}};return n(e)-n(t)}
/**
      * @license
      * Copyright 2020 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */)(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Xa.size&&this.current&&!r?1:0,u=a!==this.Za;return this.Za=a,0!==i.length||u?{snapshot:new sl(this.query,e.tu,s,i,e.mutatedKeys,0===a,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new rl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Ts(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new Il(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new vl(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=Ts();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return sl.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const Tl="SyncEngine";class El{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Sl{constructor(e){this.key=e,this.hu=!1}}class xl{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new ds(e=>os(e),is),this.Iu=new Map,this.Eu=new Set,this.du=new mn(te.comparator),this.Au=new Map,this.Ru=new Za,this.Vu={},this.mu=new Map,this.fu=Sa.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function Nl(e,t,n=!0){const r=ih(e);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Dl(r,t,n,!0),s}async function Cl(e,t){const n=ih(e);await Dl(n,t,!0,!1)}async function Dl(e,t,n,r){const s=await Ou(e.localStore,es(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await Al(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&Nc(e.remoteStore,s),a}async function Al(e,t,n,r,s){e.pu=(t,n,r)=>(async function(e,t,n,r){let s=t.view.ru(n);s.Cs&&(s=await Ru(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const i=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return Gl(e,t.targetId,a.au),a.snapshot})(e,t,n,r);const i=await Ru(e.localStore,t,!0),o=new _l(t,i.Qs),a=o.ru(i.documents),u=_i.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),c=o.applyChanges(a,e.isPrimaryClient,u);Gl(e,n,c.au);const l=new El(t,n,o);return e.Tu.set(t,l),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),c.snapshot}async function kl(e,t,n){const r=C(e),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(e=>!is(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Mu(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Cc(r.remoteStore,s.targetId),jl(r,s.targetId)}).catch(Ae)):(jl(r,s.targetId),await Mu(r.localStore,s.targetId,!0))}async function Pl(e,t){const n=C(e),r=n.Tu.get(t),s=n.Iu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Cc(n.remoteStore,r.targetId))}async function Ol(e,t,n){const r=oh(e);try{const e=await(function(e,t){const n=C(e),r=me.now(),s=t.reduce((e,t)=>e.add(t.key),Ts());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=ms(),u=Ts();return n.Ns.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=Js(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new Zs(e.key,t,mr(t.value.mapValue),Gs.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(i,u);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:ys(i)}))})(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),(function(e,t,n){let r=e.Vu[e.currentUser.toKey()];r||(r=new mn(z)),r=r.insert(t,n),e.Vu[e.currentUser.toKey()]=r})(r,e.batchId,n),await Ql(r,e.changes),await Bc(r.remoteStore)}catch(e){const t=tl(e,"Failed to persist write");n.reject(t)}}async function Ml(e,t){const n=C(e);try{const e=await Au(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(x(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?x(r.hu,14607):e.removedDocuments.size>0&&(x(r.hu,42227),r.hu=!1))}),await Ql(n,e,t)}catch(e){await Ae(e)}}function Rl(e,t,n){const r=C(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const s=r.view.va(t);s.snapshot&&e.push(s.snapshot)}),(function(e,t){const n=C(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const e of n.Sa)e.va(t)&&(r=!0)}),r&&dl(n)})(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Vl(e,t,n){const r=C(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Au.get(t),i=s&&s.key;if(i){let e=new mn(te.comparator);e=e.insert(i,gr.newNoDocument(i,ge.min()));const n=Ts().add(i),s=new Ii(ge.min(),new Map,new mn(z),e,n);await Ml(r,s),r.du=r.du.remove(i),r.Au.delete(t),Kl(r)}else await Mu(r.localStore,t,!1).then(()=>jl(r,t,n)).catch(Ae)}async function Fl(e,t){const n=C(e),r=t.batch.batchId;try{const e=await Cu(n.localStore,t);Bl(n,r,null),Ul(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ql(n,e)}catch(e){await Ae(e)}}async function Ll(e,t,n){const r=C(e);try{const e=await(function(e,t){const n=C(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(x(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})})(r.localStore,t);Bl(r,t,n),Ul(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Ql(r,e)}catch(n){await Ae(n)}}async function ql(e,t){const n=C(e);Oc(n.remoteStore)||v(Tl,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const e=await(function(e){const t=C(e);return t.persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>t.mutationQueue.getHighestUnacknowledgedBatchId(e))})(n.localStore);if(e===Qe)return void t.resolve();const r=n.mu.get(e)||[];r.push(t),n.mu.set(e,r)}catch(e){const n=tl(e,"Initialization of waitForPendingWrites() operation failed");t.reject(n)}}function Ul(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function Bl(e,t,n){const r=C(e);let s=r.Vu[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function jl(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||zl(e,t)})}function zl(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(Cc(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),Kl(e))}function Gl(e,t,n){for(const r of n)r instanceof vl?(e.Ru.addReference(r.key,t),$l(e,r)):r instanceof Il?(v(Tl,"Document no longer in limbo: "+r.key),e.Ru.removeReference(r.key,t),e.Ru.containsKey(r.key)||zl(e,r.key)):E(19791,{wu:r})}function $l(e,t){const n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Eu.has(r)||(v(Tl,"New document in limbo: "+n),e.Eu.add(r),Kl(e))}function Kl(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new te(X.fromString(t)),r=e.fu.next();e.Au.set(r,new Sl(n)),e.du=e.du.insert(n,r),Nc(e.remoteStore,new po(es(Jr(n.path)),r,"TargetPurposeLimboResolution",Ke.ce))}}async function Ql(e,t,n){const r=C(e),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){s.push(e);const t=vu.As(a.targetId,e);i.push(t)}}))}),await Promise.all(o),r.Pu.H_(s),await(async function(e,t){const n=C(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>ke.forEach(t,t=>ke.forEach(t.Es,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>ke.forEach(t.ds,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!Le(e))throw e;v(Tu,"Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.Ms.get(t),r=e.snapshotVersion,s=e.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(t,s)}}})(r.localStore,i))}async function Wl(e,t){const n=C(e);if(!n.currentUser.isEqual(t)){v(Tl,"User change. New user:",t.toKey());const e=await Nu(n.localStore,t);n.currentUser=t,(function(e,t){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new A(D.CANCELLED,t))})}),e.mu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Ql(n,e.Ls)}}function Hl(e,t){const n=C(e),r=n.Au.get(t);if(r&&r.hu)return Ts().add(r.key);{let e=Ts();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}async function Jl(e,t){const n=C(e),r=await Ru(n.localStore,t.query,!0),s=t.view.cu(r);return n.isPrimaryClient&&Gl(n,t.targetId,s.au),s}async function Yl(e,t){const n=C(e);return Fu(n.localStore,t).then(e=>Ql(n,e))}async function Xl(e,t,n,r){const s=C(e),i=await(function(e,t){const n=C(e),r=C(n.mutationQueue);return n.persistence.runTransaction("Lookup mutation documents","readonly",e=>r.er(e,t).next(t=>t?n.localDocuments.getDocuments(e,t):ke.resolve(null)))})(s.localStore,t);null!==i?("pending"===n?await Bc(s.remoteStore):"acknowledged"===n||"rejected"===n?(Bl(s,t,r||null),Ul(s,t),(function(e,t){C(C(e).mutationQueue).ir(t)})(s.localStore,t)):E(6720,"Unknown batchState",{Su:n}),await Ql(s,i)):v(Tl,"Cannot apply mutation batch with id: "+t)}async function Zl(e,t){const n=C(e);if(ih(n),oh(n),!0===t&&!0!==n.gu){const e=n.sharedClientState.getAllActiveQueryTargets(),t=await eh(n,e.toArray());n.gu=!0,await Yc(n.remoteStore,!0);for(const e of t)Nc(n.remoteStore,e)}else if(!1===t&&!1!==n.gu){const e=[];let t=Promise.resolve();n.Iu.forEach((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?e.push(s):t=t.then(()=>(jl(n,s),Mu(n.localStore,s,!0))),Cc(n.remoteStore,s)}),await t,await eh(n,e),(function(e){const t=C(e);t.Au.forEach((e,n)=>{Cc(t.remoteStore,n)}),t.Ru.Jr(),t.Au=new Map,t.du=new mn(te.comparator)})(n),n.gu=!1,await Yc(n.remoteStore,!1)}}async function eh(e,t,n){const r=C(e),s=[],i=[];for(const e of t){let t;const n=r.Iu.get(e);if(n&&0!==n.length){t=await Ou(r.localStore,es(n[0]));for(const e of n){const t=r.Tu.get(e),n=await Jl(r,t);n.snapshot&&i.push(n.snapshot)}}else{const n=await Vu(r.localStore,e);t=await Ou(r.localStore,n),await Al(r,th(n),e,!1,t.resumeToken)}s.push(t)}return r.Pu.H_(i),s}function th(e){return Hr(e.path,e.collectionGroup,e.orderBy,e.filters,e.limit,"F",e.startAt,e.endAt)}function nh(e){return(function(e){return C(C(e).persistence).Ts()})(C(e).localStore)}async function rh(e,t,n,r){const s=C(e);if(s.gu)return void v(Tl,"Ignoring unexpected query state notification.");const i=s.Iu.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{const e=await Fu(s.localStore,cs(i[0])),r=Ii.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,Tn.EMPTY_BYTE_STRING);await Ql(s,e,r);break}case"rejected":await Mu(s.localStore,t,!0),jl(s,t,r);break;default:E(64155,n)}}async function sh(e,t,n){const r=ih(e);if(r.gu){for(const e of t){if(r.Iu.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){v(Tl,"Adding an already active target "+e);continue}const t=await Vu(r.localStore,e),n=await Ou(r.localStore,t);await Al(r,th(t),n.targetId,!1,n.resumeToken),Nc(r.remoteStore,n)}for(const e of n)r.Iu.has(e)&&await Mu(r.localStore,e,!1).then(()=>{Cc(r.remoteStore,e),jl(r,e)}).catch(Ae)}}function ih(e){const t=C(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Ml.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Hl.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Vl.bind(null,t),t.Pu.H_=ll.bind(null,t.eventManager),t.Pu.yu=hl.bind(null,t.eventManager),t}function oh(e){const t=C(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Fl.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Ll.bind(null,t),t}function ah(e,t,n){const r=C(e);(async function(e,t,n){try{const r=await t.getMetadata();if(await(function(e,t){const n=C(e),r=Li(t.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",e=>n.Ii.getBundleMetadata(e,t.id)).then(e=>!!e&&e.createTime.compareTo(r)>=0)})(e.localStore,r))return await t.close(),n._completeWith((function(e){return{taskState:"Success",documentsLoaded:e.totalDocuments,bytesLoaded:e.totalBytes,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}})(r)),Promise.resolve(new Set);n._updateProgress(bl(r));const s=new wl(r,t.serializer);let i=await t.bu();for(;i;){const e=await s.Ga(i);e&&n._updateProgress(e),i=await t.bu()}const o=await s.ja(e.localStore);return await Ql(e,o.Ha,void 0),await(function(e,t){const n=C(e);return n.persistence.runTransaction("Save bundle","readwrite",e=>n.Ii.saveBundleMetadata(e,t))})(e.localStore,r),n._completeWith(o.progress),Promise.resolve(o.Ja)}catch(e){return _(Tl,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}}
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */)(r,t,n).then(e=>{r.sharedClientState.notifyBundleLoaded(e)})}class uh{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=mc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return xu(this.persistence,new _u,e.initialUser,this.serializer)}Cu(e){return new iu(au.mi,this.serializer)}Du(e){return new ec}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}uh.provider={build:()=>new uh};class ch extends uh{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){x(this.persistence.referenceDelegate instanceof uu,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Ma(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?ya.withCacheSize(this.cacheSizeBytes):ya.DEFAULT;return new iu(e=>uu.mi(e,t),this.serializer)}}class lh extends uh{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await oh(this.xu.syncEngine),await Bc(this.xu.remoteStore),await this.persistence.Ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return xu(this.persistence,new _u,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Ma(n,e.asyncQueue,t)}Mu(e,t){const n=new $e(t,this.persistence);return new Ge(e.asyncQueue,n)}Cu(e){const t=bu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?ya.withCacheSize(this.cacheSizeBytes):ya.DEFAULT;return new pu(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,dc(),fc(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new ec}}class hh extends lh{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Zu&&(this.sharedClientState.syncEngine={Co:Xl.bind(null,t),vo:rh.bind(null,t),Fo:sh.bind(null,t),Ts:nh.bind(null,t),Do:Yl.bind(null,t)},await this.sharedClientState.start()),await this.persistence.Ji(async e=>{await Zl(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){const t=dc();if(!Zu.v(t))throw new A(D.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=bu(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Zu(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class dh{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Rl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Wl.bind(null,this.syncEngine),await Yc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new ol}createDatastore(e){const t=mc(e.databaseInfo.databaseId),n=(function(e){return new hc(e)})(e.databaseInfo);return(function(e,t,n,r){return new Ic(e,t,n,r)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(e,t,n,r,s){return new Ec(e,t,n,r,s)})(this.localStore,this.datastore,e.asyncQueue,e=>Rl(this.syncEngine,e,0),rc.v()?new rc:new tc)}createSyncEngine(e,t){return(function(e,t,n,r,s,i,o){const a=new xl(e,t,n,r,s,i);return o&&(a.gu=!0),a})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(e){const t=C(e);v(Tc,"RemoteStore shutting down."),t.Ea.add(5),await xc(t),t.Aa.shutdown(),t.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function fh(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){const r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */dh.provider={build:()=>new dh};class mh{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):I("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class gh{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new k,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.$a()?this.metadata.resolve(e.Qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(e?.Qa)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.qu();if(null===e)return null;const t=this.Lu.decode(e),n=Number(t);isNaN(n)&&this.Qu(`length string (${t}) is not valid number`);const r=await this.$u(n);return new pl(JSON.parse(r),e.length+n)}Uu(){return this.buffer.findIndex(e=>e==="{".charCodeAt(0))}async qu(){for(;this.Uu()<0&&!await this.Ku(););if(0===this.buffer.length)return null;const e=this.Uu();e<0&&this.Qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async $u(e){for(;this.buffer.length<e;)await this.Ku()&&this.Qu("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Qu(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Ku(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ph{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.$a())throw new Error(`The first element of the bundle is not a metadata object, it is\n         ${JSON.stringify(n?.Qa)}`);this.metadata=n;do{n=this.bu(),null!==n&&this.elements.push(n)}while(null!==n)}getMetadata(){return this.metadata}Wu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;const e=this.qu(),t=this.$u(e);return new pl(JSON.parse(t),e)}$u(e){if(this.cursor+e>this.bundleData.length)throw new A(D.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){const e=this.cursor;let t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw new Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw new Error("Reached the end of bundle when more is expected.")}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class yh{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new A(D.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(e,t){const n=C(e),r={documents:t.map(e=>ji(n.serializer,e))},s=await n.Ho("BatchGetDocuments",n.serializer.databaseId,X.emptyPath(),r,t.length),i=new Map;s.forEach(e=>{const t=Ji(n.serializer,e);i.set(t.key.toString(),t)});const o=[];return t.forEach(e=>{const t=i.get(e.toString());x(!!t,55234,{key:e}),o.push(t)}),o})(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new ri(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{const n=te.fromPath(t);this.mutations.push(new si(n,this.precondition(n)))}),await(async function(e,t){const n=C(e),r={writes:t.map(e=>Xi(n.serializer,e))};await n.Go("Commit",n.serializer.databaseId,X.emptyPath(),r)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw E(50498,{Gu:e.constructor.name});t=ge.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new A(D.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ge.min())?Gs.exists(!1):Gs.updateTime(t):Gs.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ge.min()))throw new A(D.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Gs.updateTime(t)}return Gs.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class wh{constructor(e,t,n,r,s){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=s,this.zu=n.maxAttempts,this.M_=new gc(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const e=new yh(this.datastore),t=this.Hu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Yu(e)}))}).catch(e=>{this.Yu(e)})})}Hu(e){try{const t=this.updateFunction(e);return!We(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(e){this.zu>0&&this.Zu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Zu(e){if("FirebaseError"===e?.name){const t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!di(t)}return!1}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const bh="FirestoreClient";class vh{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=g.UNAUTHENTICATED,this.clientId=j.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{v(bh,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(v(bh,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new k;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=tl(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Ih(e,t){e.asyncQueue.verifyOperationInProgress(),v(bh,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Nu(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function _h(e,t){e.asyncQueue.verifyOperationInProgress();const n=await Th(e);v(bh,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Jc(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Jc(t.remoteStore,n)),e._onlineComponents=t}async function Th(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){v(bh,"Using user provided OfflineComponentProvider");try{await Ih(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!(function(e){return"FirebaseError"===e.name?e.code===D.FAILED_PRECONDITION||e.code===D.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code})(n))throw n;_("Error using user provided cache. Falling back to memory cache: "+n),await Ih(e,new uh)}}else v(bh,"Using default OfflineComponentProvider"),await Ih(e,new ch(void 0));return e._offlineComponents}async function Eh(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(v(bh,"Using user provided OnlineComponentProvider"),await _h(e,e._uninitializedComponentsProvider._online)):(v(bh,"Using default OnlineComponentProvider"),await _h(e,new dh))),e._onlineComponents}function Sh(e){return Th(e).then(e=>e.persistence)}function xh(e){return Th(e).then(e=>e.localStore)}function Nh(e){return Eh(e).then(e=>e.remoteStore)}function Ch(e){return Eh(e).then(e=>e.syncEngine)}function Dh(e){return Eh(e).then(e=>e.datastore)}async function Ah(e){const t=await Eh(e),n=t.eventManager;return n.onListen=Nl.bind(null,t.syncEngine),n.onUnlisten=kl.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Cl.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=Pl.bind(null,t.syncEngine),n}function kh(e){return e.asyncQueue.enqueue(async()=>{const t=await Sh(e),n=await Nh(e);return t.setNetworkEnabled(!0),(function(e){const t=C(e);return t.Ea.delete(0),Sc(t)})(n)})}function Ph(e){return e.asyncQueue.enqueue(async()=>{const t=await Sh(e),n=await Nh(e);return t.setNetworkEnabled(!1),(async function(e){const t=C(e);t.Ea.add(0),await xc(t),t.Ra.set("Offline")})(n)})}function Oh(e,t){const n=new k;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{const r=await(function(e,t){const n=C(e);return n.persistence.runTransaction("read document","readonly",e=>n.localDocuments.getDocument(e,t))})(e,t);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new A(D.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(e){const r=tl(e,`Failed to get document '${t} from cache`);n.reject(r)}})(await xh(e),t,n)),n.promise}function Mh(e,t,n={}){const r=new k;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,s){const i=new mh({next:a=>{i.Nu(),t.enqueueAndForget(()=>cl(e,o));const u=a.docs.has(n);!u&&a.fromCache?s.reject(new A(D.UNAVAILABLE,"Failed to get document because the client is offline.")):u&&a.fromCache&&r&&"server"===r.source?s.reject(new A(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(a)},error:e=>s.reject(e)}),o=new gl(Jr(n.path),i,{includeMetadataChanges:!0,qa:!0});return ul(e,o)})(await Ah(e),e.asyncQueue,t,n,r)),r.promise}function Rh(e,t){const n=new k;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{const r=await Ru(e,t,!0),s=new _l(t,r.Qs),i=s.ru(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(e){const r=tl(e,`Failed to execute query '${t} against cache`);n.reject(r)}})(await xh(e),t,n)),n.promise}function Vh(e,t,n={}){const r=new k;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,s){const i=new mh({next:n=>{i.Nu(),t.enqueueAndForget(()=>cl(e,o)),n.fromCache&&"server"===r.source?s.reject(new A(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),o=new gl(n,i,{includeMetadataChanges:!0,qa:!0});return ul(e,o)})(await Ah(e),e.asyncQueue,t,n,r)),r.promise}function Fh(e,t,n){const r=new k;return e.asyncQueue.enqueueAndForget(async()=>{try{const s=await Dh(e);r.resolve((async function(e,t,n){const r=C(e),{request:s,gt:i,parent:o}=ro(r.serializer,ts(t),n);r.connection.$o||delete s.parent;const a=(await r.Ho("RunAggregationQuery",r.serializer.databaseId,o,s,1)).filter(e=>!!e.result);x(1===a.length,64727);const u=a[0].result?.aggregateFields;return Object.keys(u).reduce((e,t)=>(e[i[t]]=u[t],e),{})})(s,t,n))}catch(e){r.reject(e)}}),r.promise}function Lh(e,t){const n=new mh(t);return e.asyncQueue.enqueueAndForget(async()=>(function(e,t){C(e).Ca.add(t),t.next()})(await Ah(e),n)),()=>{n.Nu(),e.asyncQueue.enqueueAndForget(async()=>(function(e,t){C(e).Ca.delete(t)})(await Ah(e),n))}}function qh(e,t,n,r){const s=(function(e,t){let n;return n="string"==typeof e?gi().encode(e):e,(function(e,t){return new gh(e,t)})((function(e,t){if(e instanceof Uint8Array)return fh(e,t);if(e instanceof ArrayBuffer)return fh(new Uint8Array(e),t);if(e instanceof ReadableStream)return e.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(n),t)})(n,mc(t));e.asyncQueue.enqueueAndForget(async()=>{ah(await Ch(e),s,r)})}function Uh(e,t){return e.asyncQueue.enqueue(async()=>(function(e,t){const n=C(e);return n.persistence.runTransaction("Get named query","readonly",e=>n.Ii.getNamedQuery(e,t))})(await xh(e),t))}function Bh(e,t){return(function(e,t){return new ph(e,t)})(e,t)}function jh(e,t){return e.asyncQueue.enqueue(async()=>(async function(e,t){const n=C(e),r=n.indexManager,s=[];return n.persistence.runTransaction("Configure indexes","readwrite",e=>r.getFieldIndexes(e).next(n=>
/**
      * @license
      * Copyright 2017 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */
(function(e,t,n,r,s){e=[...e],t=[...t],e.sort(n),t.sort(n);const i=e.length,o=t.length;let a=0,u=0;for(;a<o&&u<i;){const i=n(e[u],t[a]);i<0?s(e[u++]):i>0?r(t[a++]):(a++,u++)}for(;a<o;)r(t[a++]);for(;u<i;)s(e[u++])})(n,t,ve,t=>{s.push(r.addFieldIndex(e,t))},t=>{s.push(r.deleteFieldIndex(e,t))})).next(()=>ke.waitFor(s)))})(await xh(e),t))}function zh(e,t){return e.asyncQueue.enqueue(async()=>(function(e,t){C(e).Fs.Vs=t})(await xh(e),t))}function Gh(e){return e.asyncQueue.enqueue(async()=>(function(e){const t=C(e),n=t.indexManager;return t.persistence.runTransaction("Delete All Indexes","readwrite",e=>n.deleteAllFieldIndexes(e))})(await xh(e)))}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function $h(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}const Kh=new Map,Qh="firestore.googleapis.com",Wh=!0;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Hh{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new A(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Qh,this.ssl=Wh}else this.host=e.host,this.ssl=e.ssl??Wh;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=pa;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<ka)throw new A(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}re("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$h(e.experimentalLongPollingOptions??{}),(function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new A(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new A(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new A(D.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
      * @license
      * Copyright 2020 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */)(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(e,t){return e.timeoutSeconds===t.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Jh{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new A(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new A(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hh(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=(function(e){if(!e)return new O;switch(e.type){case"firstParty":return new F(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new A(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const t=Kh.get(e);t&&(v("ComponentProvider","Removing Datastore"),Kh.delete(e),t.terminate())})(this),Promise.resolve()}}function Yh(e,t,n,r={}){e=ue(e,Jh);const s=(0,l.isCloudWorkstation)(t),i=e._getSettings(),o={...i,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;s&&((0,l.pingServer)(`https://${a}`),(0,l.updateEmulatorBanner)("Firestore",!0)),i.host!==Qh&&i.host!==a&&_("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:a,ssl:s,emulatorOptions:r};if(!(0,l.deepEqual)(u,o)&&(e._setSettings(u),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=g.MOCK_USER;else{t=(0,l.createMockUserToken)(r.mockUserToken,e._app?.options.projectId);const s=r.mockUserToken.sub||r.mockUserToken.user_id;if(!s)throw new A(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new g(s)}e._authCredentials=new M(new P(t,n))}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Xh{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Xh(this.firestore,e,this._query)}}class Zh{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ed(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Zh(this.firestore,e,this._key)}toJSON(){return{type:Zh._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(he(t,Zh._jsonSchema))return new Zh(e,n||null,new te(X.fromString(t.referencePath)))}}Zh._jsonSchemaVersion="firestore/documentReference/1.0",Zh._jsonSchema={type:le("string",Zh._jsonSchemaVersion),referencePath:le("string")};class ed extends Xh{constructor(e,t,n){super(e,t,Jr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Zh(this.firestore,null,new te(e))}withConverter(e){return new ed(this.firestore,e,this._path)}}function td(e,t,...n){if(e=(0,l.getModularInstance)(e),ne("collection","path",t),e instanceof Jh){const r=X.fromString(t,...n);return ie(r),new ed(e,null,r)}{if(!(e instanceof Zh||e instanceof ed))throw new A(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(X.fromString(t,...n));return ie(r),new ed(e.firestore,null,r)}}function nd(e,t){if(e=ue(e,Jh),ne("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new A(D.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Xh(e,null,(function(e){return new Wr(X.emptyPath(),e)})(t))}function rd(e,t,...n){if(e=(0,l.getModularInstance)(e),1===arguments.length&&(t=j.newId()),ne("doc","path",t),e instanceof Jh){const r=X.fromString(t,...n);return se(r),new Zh(e,null,new te(r))}{if(!(e instanceof Zh||e instanceof ed))throw new A(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(X.fromString(t,...n));return se(r),new Zh(e.firestore,e instanceof ed?e.converter:null,new te(r))}}function sd(e,t){return e=(0,l.getModularInstance)(e),t=(0,l.getModularInstance)(t),(e instanceof Zh||e instanceof ed)&&(t instanceof Zh||t instanceof ed)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function id(e,t){return e=(0,l.getModularInstance)(e),t=(0,l.getModularInstance)(t),e instanceof Xh&&t instanceof Xh&&e.firestore===t.firestore&&is(e._query,t._query)&&e.converter===t.converter
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}const od="AsyncQueue";class ad{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new gc(this,"async_queue_retry"),this._c=()=>{const e=fc();e&&v(od,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=fc();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=fc();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new k;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Le(e))throw e;v(od,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,I("INTERNAL UNHANDLED ERROR: ",ud(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=el.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&E(47125,{Pc:ud(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ud(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}function cd(e){return(function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const e of t)if(e in n&&"function"==typeof n[e])return!0;return!1}
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */)(e,["next","error","complete"])}class ld{constructor(){this._progressObserver={},this._taskCompletionResolver=new k,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const hd=-1;class dd extends Jh{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new ad,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ad(e),this._firestoreClient=void 0,await e}}}function fd(e,t,n){n||(n=Vn);const r=(0,a._getProvider)(e,"firestore");if(r.isInitialized(n)){const e=r.getImmediate({identifier:n}),s=r.getOptions(n);if((0,l.deepEqual)(s,t))return e;throw new A(D.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new A(D.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<ka)throw new A(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&(0,l.isCloudWorkstation)(t.host)&&(0,l.pingServer)(t.host),r.initialize({options:t,instanceIdentifier:n})}function md(e,t){const n="object"==typeof e?e:(0,a.getApp)(),r="string"==typeof e?e:t||Vn,s=(0,a._getProvider)(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const e=(0,l.getDefaultEmulatorHostnameAndPort)("firestore");e&&Yh(s,...e)}return s}function gd(e){if(e._terminated)throw new A(D.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||pd(e),e._firestoreClient}function pd(e){const t=e._freezeSettings(),n=(function(e,t,n,r){return new Rn(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,$h(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator)})(e._databaseId,e._app?.options.appId||"",e._persistenceKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new vh(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&(function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}})(e._componentsProvider))}function yd(e,t){_("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const n=e._freezeSettings();return bd(e,dh.provider,{build:e=>new lh(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function wd(e){_("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=e._freezeSettings();bd(e,dh.provider,{build:e=>new hh(e,t.cacheSizeBytes)})}function bd(e,t,n){if((e=ue(e,dd))._firestoreClient||e._terminated)throw new A(D.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new A(D.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},pd(e)}function vd(e){if(e._initialized&&!e._terminated)throw new A(D.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new k;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await(async function(e){if(!Me.v())return Promise.resolve();const t=e+gu;await Me.delete(t)})(bu(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function Id(e){return(function(e){const t=new k;return e.asyncQueue.enqueueAndForget(async()=>ql(await Ch(e),t)),t.promise})(gd(e=ue(e,dd)))}function _d(e){return kh(gd(e=ue(e,dd)))}function Td(e){return Ph(gd(e=ue(e,dd)))}function Ed(e){return(0,a._removeServiceInstance)(e.app,"firestore",e._databaseId.database),e._delete()}function Sd(e,t){const n=gd(e=ue(e,dd)),r=new ld;return qh(n,e._databaseId,t,r),r}function xd(e,t){return Uh(gd(e=ue(e,dd)),t).then(t=>t?new Xh(e,null,t.query):null)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Nd{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Cd{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Dd{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Dd(Tn.fromBase64String(e))}catch(e){throw new A(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Dd(Tn.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Dd._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(he(e,Dd._jsonSchema))return Dd.fromBase64String(e.bytes)}}Dd._jsonSchemaVersion="firestore/bytes/1.0",Dd._jsonSchema={type:le("string",Dd._jsonSchemaVersion),bytes:le("string")};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Ad{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new A(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ee(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function kd(){return new Ad(J)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Pd{constructor(e){this._methodName=e}}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Od{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new A(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new A(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Od._jsonSchemaVersion}}static fromJSON(e){if(he(e,Od._jsonSchema))return new Od(e.latitude,e.longitude)}}Od._jsonSchemaVersion="firestore/geoPoint/1.0",Od._jsonSchema={type:le("string",Od._jsonSchemaVersion),latitude:le("number"),longitude:le("number")};
/**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Md{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return(function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Md._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(he(e,Md._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new Md(e.vectorValues);throw new A(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Md._jsonSchemaVersion="firestore/vectorValue/1.0",Md._jsonSchema={type:le("string",Md._jsonSchemaVersion),vectorValues:le("object")};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Rd=/^__.*__$/;class Vd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Zs(e,this.data,this.fieldMask,t,this.fieldTransforms):new Xs(e,this.data,t,this.fieldTransforms)}}class Fd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Zs(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Ld(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw E(40011,{Ac:e})}}class qd{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new qd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return of(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(Ld(this.Ac)&&Rd.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class Ud{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||mc(e)}Cc(e,t,n,r=!1){return new qd({Ac:e,methodName:t,Dc:n,path:ee.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Bd(e){const t=e._freezeSettings(),n=mc(e._databaseId);return new Ud(e._databaseId,!!t.ignoreUndefinedProperties,n)}function jd(e,t,n,r,s,i={}){const o=e.Cc(i.merge||i.mergeFields?2:0,t,n,s);tf("Data must be an object, but it was:",o,r);const a=Zd(r,o);let u,c;if(i.merge)u=new vn(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=nf(t,r,n);if(!o.contains(s))throw new A(D.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);af(e,s)||e.push(s)}u=new vn(e),c=o.fieldTransforms.filter(e=>u.covers(e.field))}else u=null,c=o.fieldTransforms;return new Vd(new fr(a),u,c)}class zd extends Pd{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zd}}function Gd(e,t,n){return new qd({Ac:3,Dc:t.settings.Dc,methodName:e._methodName,fc:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class $d extends Pd{_toFieldTransform(e){return new Bs(e.path,new Os)}isEqual(e){return e instanceof $d}}class Kd extends Pd{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Gd(this,e,!0),n=this.vc.map(e=>Xd(e,t)),r=new Ms(n);return new Bs(e.path,r)}isEqual(e){return e instanceof Kd&&(0,l.deepEqual)(this.vc,e.vc)}}class Qd extends Pd{constructor(e,t){super(e),this.vc=t}_toFieldTransform(e){const t=Gd(this,e,!0),n=this.vc.map(e=>Xd(e,t)),r=new Vs(n);return new Bs(e.path,r)}isEqual(e){return e instanceof Qd&&(0,l.deepEqual)(this.vc,e.vc)}}class Wd extends Pd{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new Ls(e.serializer,Cs(e.serializer,this.Fc));return new Bs(e.path,t)}isEqual(e){return e instanceof Wd&&this.Fc===e.Fc}}function Hd(e,t,n,r){const s=e.Cc(1,t,n);tf("Data must be an object, but it was:",s,r);const i=[],o=fr.empty();hn(r,(e,r)=>{const a=sf(t,e,n);r=(0,l.getModularInstance)(r);const u=s.yc(a);if(r instanceof zd)i.push(a);else{const e=Xd(r,u);null!=e&&(i.push(a),o.set(a,e))}});const a=new vn(i);return new Fd(o,a,s.fieldTransforms)}function Jd(e,t,n,r,s,i){const o=e.Cc(1,t,n),a=[nf(t,r,n)],u=[s];if(i.length%2!=0)throw new A(D.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)a.push(nf(t,i[e])),u.push(i[e+1]);const c=[],h=fr.empty();for(let e=a.length-1;e>=0;--e)if(!af(c,a[e])){const t=a[e];let n=u[e];n=(0,l.getModularInstance)(n);const r=o.yc(t);if(n instanceof zd)c.push(t);else{const e=Xd(n,r);null!=e&&(c.push(t),h.set(t,e))}}const d=new vn(c);return new Fd(h,d,o.fieldTransforms)}function Yd(e,t,n,r=!1){return Xd(n,e.Cc(r?4:3,t))}function Xd(e,t){if(ef(e=(0,l.getModularInstance)(e)))return tf("Unsupported field value:",t,e),Zd(e,t);if(e instanceof Pd)return(function(e,t){if(!Ld(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)})(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return(function(e,t){const n=[];let r=0;for(const s of e){let e=Xd(s,t.wc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}})(e,t)}return(function(e,t){if(null===(e=(0,l.getModularInstance)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Cs(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=me.fromDate(e);return{timestampValue:Ri(t.serializer,n)}}if(e instanceof me){const n=new me(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Ri(t.serializer,n)}}if(e instanceof Od)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Dd)return{bytesValue:Vi(t.serializer,e._byteString)};if(e instanceof Zh){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:qi(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Md)return(function(e,t){return{mapValue:{fields:{[Ln]:{stringValue:Bn},[jn]:{arrayValue:{values:e.toArray().map(e=>{if("number"!=typeof e)throw t.Sc("VectorValues must only contain numeric values.");return xs(t.serializer,e)})}}}}}})(e,t);throw t.Sc(`Unsupported field value: ${ae(e)}`)})(e,t)}function Zd(e,t){const n={};return fn(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):hn(e,(e,r)=>{const s=Xd(r,t.mc(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function ef(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof me||e instanceof Od||e instanceof Dd||e instanceof Zh||e instanceof Pd||e instanceof Md)}function tf(e,t,n){if(!ef(n)||!oe(n)){const r=ae(n);throw"an object"===r?t.Sc(e+" a custom object"):t.Sc(e+" "+r)}}function nf(e,t,n){if((t=(0,l.getModularInstance)(t))instanceof Ad)return t._internalPath;if("string"==typeof t)return sf(e,t);throw of("Field path arguments must be of type string or ",e,!1,void 0,n)}const rf=new RegExp("[~\\*/\\[\\]]");function sf(e,t,n){if(t.search(rf)>=0)throw of(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Ad(...t.split("."))._internalPath}catch(r){throw of(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function of(e,t,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new A(D.INVALID_ARGUMENT,a+e+u)}function af(e,t){return e.some(e=>e.isEqual(t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class uf{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Zh(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new cf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(lf("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class cf extends uf{data(){return super.data()}}function lf(e,t){return"string"==typeof t?sf(e,t):t instanceof Ad?t._internalPath:t._delegate._internalPath}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function hf(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new A(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class df{}class ff extends df{}function mf(e,t,...n){let r=[];t instanceof df&&r.push(t),r=r.concat(n),(function(e){const t=e.filter(e=>e instanceof yf).length,n=e.filter(e=>e instanceof gf).length;if(t>1||t>0&&n>0)throw new A(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */)(r);for(const t of r)e=t._apply(e);return e}class gf extends ff{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new gf(e,t,n)}_apply(e){const t=this._parse(e);return Mf(e._query,t),new Xh(e.firestore,e.converter,rs(e._query,t))}_parse(e){const t=Bd(e.firestore),n=(function(e,t,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new A(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){Of(o,i);const t=[];for(const n of o)t.push(Pf(r,e,n));a={arrayValue:{values:t}}}else a=Pf(r,e,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||Of(o,i),a=Yd(n,t,o,"in"===i||"not-in"===i);return _r.create(s,i,a)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function pf(e,t,n){const r=t,s=lf("where",e);return gf._create(s,r,n)}class yf extends df{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new yf(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:Tr.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:((function(e,t){let n=e;const r=t.getFlattenedFilters();for(const e of r)Mf(n,e),n=rs(n,e)})(e._query,t),new Xh(e.firestore,e.converter,rs(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function wf(...e){return e.forEach(e=>Rf("or",e)),yf._create("or",e)}function bf(...e){return e.forEach(e=>Rf("and",e)),yf._create("and",e)}class vf extends ff{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new vf(e,t)}_apply(e){const t=(function(e,t,n){if(null!==e.startAt)throw new A(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new A(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new br(t,n)})(e._query,this._field,this._direction);return new Xh(e.firestore,e.converter,(function(e,t){const n=e.explicitOrderBy.concat([t]);return new Wr(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)})(e._query,t))}}function If(e,t="asc"){const n=t,r=lf("orderBy",e);return vf._create(r,n)}class _f extends ff{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new _f(e,t,n)}_apply(e){return new Xh(e.firestore,e.converter,ss(e._query,this._limit,this._limitType))}}function Tf(e){return ce("limit",e),_f._create("limit",e,"F")}function Ef(e){return ce("limitToLast",e),_f._create("limitToLast",e,"L")}class Sf extends ff{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Sf(e,t,n)}_apply(e){const t=kf(e,this.type,this._docOrFields,this._inclusive);return new Xh(e.firestore,e.converter,(function(e,t){return new Wr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)})(e._query,t))}}function xf(...e){return Sf._create("startAt",e,!0)}function Nf(...e){return Sf._create("startAfter",e,!1)}class Cf extends ff{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Cf(e,t,n)}_apply(e){const t=kf(e,this.type,this._docOrFields,this._inclusive);return new Xh(e.firestore,e.converter,(function(e,t){return new Wr(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)})(e._query,t))}}function Df(...e){return Cf._create("endBefore",e,!1)}function Af(...e){return Cf._create("endAt",e,!0)}function kf(e,t,n,r){if(n[0]=(0,l.getModularInstance)(n[0]),n[0]instanceof uf)return(function(e,t,n,r,s){if(!r)throw new A(D.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of Zr(e))if(n.field.isKeyField())i.push(Zn(t,r.key));else{const e=r.data.field(n.field);if(Pn(e))throw new A(D.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===e){const e=n.field.canonicalString();throw new A(D.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`)}i.push(e)}return new pr(i,s)})(e._query,e.firestore._databaseId,t,n[0]._document,r);{const s=Bd(e.firestore);return(function(e,t,n,r,s,i){const o=e.explicitOrderBy;if(s.length>o.length)throw new A(D.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let i=0;i<s.length;i++){const u=s[i];if(o[i].field.isKeyField()){if("string"!=typeof u)throw new A(D.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof u}`);if(!Xr(e)&&-1!==u.indexOf("/"))throw new A(D.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${u}' contains a slash.`);const n=e.path.child(X.fromString(u));if(!te.isDocumentKey(n))throw new A(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new te(n);a.push(Zn(t,s))}else{const e=Yd(n,r,u);a.push(e)}}return new pr(a,i)})(e._query,e.firestore._databaseId,s,t,n,r)}}function Pf(e,t,n){if("string"==typeof(n=(0,l.getModularInstance)(n))){if(""===n)throw new A(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Xr(t)&&-1!==n.indexOf("/"))throw new A(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(X.fromString(n));if(!te.isDocumentKey(r))throw new A(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zn(e,new te(r))}if(n instanceof Zh)return Zn(e,n._key);throw new A(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ae(n)}.`)}function Of(e,t){if(!Array.isArray(e)||0===e.length)throw new A(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Mf(e,t){const n=(function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null})(e.filters,(function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(null!==n)throw n===t.op?new A(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new A(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function Rf(e,t){if(!(t instanceof gf||t instanceof yf))throw new A(D.INVALID_ARGUMENT,`Function ${e}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Vf{convertValue(e,t="none"){switch(Gn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return xn(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw E(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return hn(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[jn].arrayValue?.values?.map(e=>xn(e.doubleValue));return new Md(t)}convertGeoPoint(e){return new Od(xn(e.latitude),xn(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=On(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Mn(e));default:return null}}convertTimestamp(e){const t=Sn(e);return new me(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);x(go(n),9688,{name:e});const r=new Fn(n.get(1),n.get(3)),s=new te(n.popFirst(5));return r.isEqual(t)||I(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ff(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class Lf extends Vf{constructor(e){super(),this.firestore=e}convertBytes(e){return new Dd(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Zh(this.firestore,null,t)}}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function qf(e){return new Nd("sum",nf("sum",e))}function Uf(e){return new Nd("avg",nf("average",e))}function Bf(){return new Nd("count")}function jf(e,t){return e instanceof Nd&&t instanceof Nd&&e.aggregateType===t.aggregateType&&e._internalFieldPath?.canonicalString()===t._internalFieldPath?.canonicalString()}function zf(e,t){return id(e.query,t.query)&&(0,l.deepEqual)(e.data(),t.data())}
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Gf="NOT SUPPORTED";class $f{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Kf extends uf{constructor(e,t,n,r,s,i){super(e,t,n,r,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Wf(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(lf("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new A(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Kf._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}function Qf(e,t,n){if(he(t,Kf._jsonSchema)){if(t.bundle===Gf)throw new A(D.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=mc(e._databaseId),s=Bh(t.bundle,r),i=s.Wu(),o=new wl(s.getMetadata(),r);for(const e of i)o.Ga(e);const a=o.documents;if(1!==a.length)throw new A(D.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${a.length} documents.`);const u=Hi(r,a[0].document),c=new te(X.fromString(t.bundleName));return new Kf(e,new Lf(e),c,u,new $f(!1,!1),n||null)}}Kf._jsonSchemaVersion="firestore/documentSnapshot/1.0",Kf._jsonSchema={type:le("string",Kf._jsonSchemaVersion),bundleSource:le("string","DocumentSnapshot"),bundleName:le("string"),bundle:le("string")};class Wf extends Kf{data(e={}){return super.data(e)}}class Hf{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new $f(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Wf(this._firestore,this._userDataWriter,n.key,n,new $f(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new A(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new Wf(e._firestore,e._userDataWriter,n.doc.key,n.doc,new $f(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new Wf(e._firestore,e._userDataWriter,t.doc.key,t.doc,new $f(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,i=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:Yf(t.type),doc:r,oldIndex:s,newIndex:i}})}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new A(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Hf._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=j.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Jf(e,t,n){if(he(t,Hf._jsonSchema)){if(t.bundle===Gf)throw new A(D.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const r=mc(e._databaseId),s=Bh(t.bundle,r),i=s.Wu(),o=new wl(s.getMetadata(),r);for(const e of i)o.Ga(e);if(1!==o.queries.length)throw new A(D.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${o.queries.length} queries.`);const a=xo(o.queries[0].bundledQuery),u=o.documents;let c=new nl;u.map(e=>{const t=Hi(r,e.document);c=c.add(t)});const l=sl.fromInitialDocuments(a,c,Ts(),!1,!1),h=new Xh(e,n||null,a);return new Hf(e,new Lf(e),h,l)}}function Yf(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return E(61501,{type:e})}}function Xf(e,t){return e instanceof Kf&&t instanceof Kf?e._firestore===t._firestore&&e._key.isEqual(t._key)&&(null===e._document?null===t._document:e._document.isEqual(t._document))&&e._converter===t._converter:e instanceof Hf&&t instanceof Hf&&e._firestore===t._firestore&&id(e.query,t.query)&&e.metadata.isEqual(t.metadata)&&e._snapshot.isEqual(t._snapshot)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Zf(e){e=ue(e,Zh);const t=ue(e.firestore,dd);return Mh(gd(t),e._key).then(n=>mm(t,e,n))}Hf._jsonSchemaVersion="firestore/querySnapshot/1.0",Hf._jsonSchema={type:le("string",Hf._jsonSchemaVersion),bundleSource:le("string","QuerySnapshot"),bundleName:le("string"),bundle:le("string")};class em extends Vf{constructor(e){super(),this.firestore=e}convertBytes(e){return new Dd(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Zh(this.firestore,null,t)}}function tm(e){e=ue(e,Zh);const t=ue(e.firestore,dd),n=gd(t),r=new em(t);return Oh(n,e._key).then(n=>new Kf(t,r,e._key,n,new $f(null!==n&&n.hasLocalMutations,!0),e.converter))}function nm(e){e=ue(e,Zh);const t=ue(e.firestore,dd);return Mh(gd(t),e._key,{source:"server"}).then(n=>mm(t,e,n))}function rm(e){e=ue(e,Xh);const t=ue(e.firestore,dd),n=gd(t),r=new em(t);return hf(e._query),Vh(n,e._query).then(n=>new Hf(t,r,e,n))}function sm(e){e=ue(e,Xh);const t=ue(e.firestore,dd),n=gd(t),r=new em(t);return Rh(n,e._query).then(n=>new Hf(t,r,e,n))}function im(e){e=ue(e,Xh);const t=ue(e.firestore,dd),n=gd(t),r=new em(t);return Vh(n,e._query,{source:"server"}).then(n=>new Hf(t,r,e,n))}function om(e,t,n){e=ue(e,Zh);const r=ue(e.firestore,dd),s=Ff(e.converter,t,n);return fm(r,[jd(Bd(r),"setDoc",e._key,s,null!==e.converter,n).toMutation(e._key,Gs.none())])}function am(e,t,n,...r){e=ue(e,Zh);const s=ue(e.firestore,dd),i=Bd(s);let o;return o="string"==typeof(t=(0,l.getModularInstance)(t))||t instanceof Ad?Jd(i,"updateDoc",e._key,t,n,r):Hd(i,"updateDoc",e._key,t),fm(s,[o.toMutation(e._key,Gs.exists(!0))])}function um(e){return fm(ue(e.firestore,dd),[new ri(e._key,Gs.none())])}function cm(e,t){const n=ue(e.firestore,dd),r=rd(e),s=Ff(e.converter,t);return fm(n,[jd(Bd(e.firestore),"addDoc",r._key,s,null!==e.converter,{}).toMutation(r._key,Gs.exists(!1))]).then(()=>r)}function lm(e,...t){e=(0,l.getModularInstance)(e);let n={includeMetadataChanges:!1,source:"default"},r=0;"object"!=typeof t[r]||cd(t[r])||(n=t[r++]);const s={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(cd(t[r])){const e=t[r];t[r]=e.next?.bind(e),t[r+1]=e.error?.bind(e),t[r+2]=e.complete?.bind(e)}let i,o,a;if(e instanceof Zh)o=ue(e.firestore,dd),a=Jr(e._key.path),i={next:n=>{t[r]&&t[r](mm(o,e,n))},error:t[r+1],complete:t[r+2]};else{const n=ue(e,Xh);o=ue(n.firestore,dd),a=n._query;const s=new em(o);i={next:e=>{t[r]&&t[r](new Hf(o,s,n,e))},error:t[r+1],complete:t[r+2]},hf(e._query)}return(function(e,t,n,r){const s=new mh(r),i=new gl(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>ul(await Ah(e),i)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>cl(await Ah(e),i))}})(gd(o),a,s,i)}function hm(e,t,...n){const r=(0,l.getModularInstance)(e),s=(function(e){const t={bundle:"",bundleName:"",bundleSource:""},n=["bundle","bundleName","bundleSource"];for(const r of n){if(!(r in e)){t.error=`snapshotJson missing required field: ${r}`;break}const n=e[r];if("string"!=typeof n){t.error=`snapshotJson field '${r}' must be a string.`;break}if(0===n.length){t.error=`snapshotJson field '${r}' cannot be an empty string.`;break}"bundle"===r?t.bundle=n:"bundleName"===r?t.bundleName=n:"bundleSource"===r&&(t.bundleSource=n)}return t})(t);if(s.error)throw new A(D.INVALID_ARGUMENT,s.error);let i,o=0;if("object"!=typeof n[o]||cd(n[o])||(i=n[o++]),"QuerySnapshot"===s.bundleSource){let e=null;if("object"==typeof n[o]&&cd(n[o])){const t=n[o++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[o++],error:n[o++],complete:n[o++]};return(function(e,t,n,r,s){let i,o=!1;return Sd(e,t.bundle).then(()=>xd(e,t.bundleName)).then(e=>{e&&!o&&(s&&e.withConverter(s),i=lm(e,n||{},r))}).catch(e=>(r.error&&r.error(e),()=>{})),()=>{o||(o=!0,i&&i())}
/**
      * @license
      * Copyright 2022 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */})(r,s,i,e,n[o])}if("DocumentSnapshot"===s.bundleSource){let e=null;if("object"==typeof n[o]&&cd(n[o])){const t=n[o++];e={next:t.next,error:t.error,complete:t.complete}}else e={next:n[o++],error:n[o++],complete:n[o++]};return(function(e,t,n,r,s){let i,o=!1;return Sd(e,t.bundle).then(()=>{if(!o){const o=new Zh(e,s||null,te.fromPath(t.bundleName));i=lm(o,n||{},r)}}).catch(e=>(r.error&&r.error(e),()=>{})),()=>{o||(o=!0,i&&i())}})(r,s,i,e,n[o])}throw new A(D.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function dm(e,t){return Lh(gd(e=ue(e,dd)),cd(t)?t:{next:t})}function fm(e,t){return(function(e,t){const n=new k;return e.asyncQueue.enqueueAndForget(async()=>Ol(await Ch(e),t,n)),n.promise})(gd(e),t)}function mm(e,t,n){const r=n.docs.get(t._key),s=new em(e);return new Kf(e,s,t._key,r,new $f(n.hasPendingWrites,n.fromCache),t.converter)}function gm(e){return pm(e,{count:Bf()})}function pm(e,t){const n=ue(e.firestore,dd),r=gd(n),s=dn(t,(e,t)=>new ui(t,e.aggregateType,e._internalFieldPath));return Fh(r,e._query,s).then(t=>(function(e,t,n){const r=new em(e);return new Cd(t,r,n)}
/**
    * @license
    * Copyright 2023 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */)(n,e,t))}class ym{constructor(e){this.kind="memory",this._onlineComponentProvider=dh.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new ch(void 0)}}toJSON(){return{kind:this.kind}}}class wm{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Nm(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class bm{constructor(){this.kind="memoryEager",this._offlineComponentProvider=uh.provider}toJSON(){return{kind:this.kind}}}class vm{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new ch(e)}}toJSON(){return{kind:this.kind}}}function Im(){return new bm}function _m(e){return new vm(e?.cacheSizeBytes)}function Tm(e){return new ym(e)}function Em(e){return new wm(e)}class Sm{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=dh.provider,this._offlineComponentProvider={build:t=>new lh(t,e?.cacheSizeBytes,this.forceOwnership)}}}class xm{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=dh.provider,this._offlineComponentProvider={build:t=>new hh(t,e?.cacheSizeBytes)}}}function Nm(e){return new Sm(e?.forceOwnership)}function Cm(){return new xm}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Dm={maxAttempts:5};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Am{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Bd(e)}set(e,t,n){this._verifyNotCommitted();const r=km(e,this._firestore),s=Ff(r.converter,t,n),i=jd(this._dataReader,"WriteBatch.set",r._key,s,null!==r.converter,n);return this._mutations.push(i.toMutation(r._key,Gs.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const s=km(e,this._firestore);let i;return i="string"==typeof(t=(0,l.getModularInstance)(t))||t instanceof Ad?Jd(this._dataReader,"WriteBatch.update",s._key,t,n,r):Hd(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,Gs.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=km(e,this._firestore);return this._mutations=this._mutations.concat(new ri(t._key,Gs.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new A(D.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function km(e,t){if((e=(0,l.getModularInstance)(e)).firestore!==t)throw new A(D.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Pm{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Bd(e)}get(e){const t=km(e,this._firestore),n=new Lf(this._firestore);return this._transaction.lookup([t._key]).then(e=>{if(!e||1!==e.length)return E(24041);const r=e[0];if(r.isFoundDocument())return new uf(this._firestore,n,r.key,r,t.converter);if(r.isNoDocument())return new uf(this._firestore,n,t._key,null,t.converter);throw E(18433,{doc:r})})}set(e,t,n){const r=km(e,this._firestore),s=Ff(r.converter,t,n),i=jd(this._dataReader,"Transaction.set",r._key,s,null!==r.converter,n);return this._transaction.set(r._key,i),this}update(e,t,n,...r){const s=km(e,this._firestore);let i;return i="string"==typeof(t=(0,l.getModularInstance)(t))||t instanceof Ad?Jd(this._dataReader,"Transaction.update",s._key,t,n,r):Hd(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,i),this}delete(e){const t=km(e,this._firestore);return this._transaction.delete(t._key),this}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Om extends Pm{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=km(e,this._firestore),n=new em(this._firestore);return super.get(e).then(e=>new Kf(this._firestore,n,t._key,e._document,new $f(!1,!1),t.converter))}}function Mm(e,t,n){e=ue(e,dd);const r={...Dm,...n};return(function(e){if(e.maxAttempts<1)throw new A(D.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(e,t,n){const r=new k;return e.asyncQueue.enqueueAndForget(async()=>{const s=await Dh(e);new wh(e.asyncQueue,s,n,t,r).ju()}),r.promise})(gd(e),n=>t(new Om(e,n)),r)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Rm(){return new zd("deleteField")}function Vm(){return new $d("serverTimestamp")}function Fm(...e){return new Kd("arrayUnion",e)}function Lm(...e){return new Qd("arrayRemove",e)}function qm(e){return new Wd("increment",e)}function Um(e){return new Md(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Bm(e){return gd(e=ue(e,dd)),new Am(e,t=>fm(e,t))
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */}function jm(e,t){const n=gd(e=ue(e,dd));if(!n._uninitializedComponentsProvider||"memory"===n._uninitializedComponentsProvider._offline.kind)return _("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(e){const t="string"==typeof e?(function(e){try{return JSON.parse(e)}catch(e){throw new A(D.INVALID_ARGUMENT,"Failed to parse JSON: "+e?.message)}})(e):e,n=[];if(Array.isArray(t.indexes))for(const e of t.indexes){const t=zm(e,"collectionGroup"),r=[];if(Array.isArray(e.fields))for(const t of e.fields){const e=sf("setIndexConfiguration",zm(t,"fieldPath"));"CONTAINS"===t.arrayConfig?r.push(new Ie(e,2)):"ASCENDING"===t.order?r.push(new Ie(e,0)):"DESCENDING"===t.order&&r.push(new Ie(e,1))}n.push(new ye(ye.UNKNOWN_ID,t,r,Te.empty()))}return n})(t);return jh(n,r)}function zm(e,t){if("string"!=typeof e[t])throw new A(D.INVALID_ARGUMENT,"Missing string value for: "+t);return e[t]}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Gm{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function $m(e){e=ue(e,dd);const t=Jm.get(e);if(t)return t;const n=gd(e);if("persistent"!==n._uninitializedComponentsProvider?._offline.kind)return null;const r=new Gm(e);return Jm.set(e,r),r}function Km(e){Hm(e,!0)}function Qm(e){Hm(e,!1)}function Wm(e){Gh(gd(e._firestore)).then(e=>v("deleting all persistent cache indexes succeeded")).catch(e=>_("deleting all persistent cache indexes failed",e))}function Hm(e,t){zh(gd(e._firestore),t).then(e=>v(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(e=>_(`setting persistent cache index auto creation isEnabled=${t} failed`,e))}const Jm=new WeakMap;
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ym(e){const t=gd(ue(e.firestore,dd)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:no(n,es(e._query)).ft}function Xm(e,t){const n=dn(t,(e,t)=>new ui(t,e.aggregateType,e._internalFieldPath)),r=gd(ue(e.firestore,dd)),s=r._onlineComponents?.datastore.serializer;return void 0===s?null:ro(s,ts(e._query),n,!0).request}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Zm{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return eg.instance.onExistenceFilterMismatch(e)}}class eg{constructor(){this.Mc=new Map}static get instance(){return tg||(tg=new eg,(function(e){if(mi)throw new Error("a TestingHooksSpi instance is already set");mi=e})(tg)),tg}lt(e){this.Mc.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.Mc;return n.set(t,e),()=>n.delete(t)}}let tg=null;!(function(e,t=!0){!(function(e){p=e})(a.SDK_VERSION),(0,a._registerComponent)(new u.Component("firestore",(e,{instanceIdentifier:n,options:r})=>{const s=e.getProvider("app").getImmediate(),i=new dd(new R(e.getProvider("auth-internal")),new q(s,e.getProvider("app-check-internal")),(function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new A(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fn(e.options.projectId,t)})(s,n),s);return r={useFetchStreams:t,...r},i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),(0,a.registerVersion)(f,m,e),(0,a.registerVersion)(f,m,"esm2020")})()},1325,[1318,1319,1322,1320,1326,1327]);
__d(function(_g,_r,i,_a,_m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"Integer",{enumerable:!0,get:function(){return t}}),Object.defineProperty(_e,"Md5",{enumerable:!0,get:function(){return r}}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return o}});var t,r,e='undefined'!=typeof globalThis?globalThis:'undefined'!=typeof window?window:void 0!==_g?_g:'undefined'!=typeof self?self:{},o={};(function(){var e;
/** @license
           Copyright The Closure Library Authors.
           SPDX-License-Identifier: Apache-2.0
           */function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function h(t,r,e){e||(e=0);const o=Array(16);if("string"==typeof r)for(var n=0;n<16;++n)o[n]=r.charCodeAt(e++)|r.charCodeAt(e++)<<8|r.charCodeAt(e++)<<16|r.charCodeAt(e++)<<24;else for(n=0;n<16;++n)o[n]=r[e++]|r[e++]<<8|r[e++]<<16|r[e++]<<24;r=t.g[0],e=t.g[1],n=t.g[2];let h,f=t.g[3];h=r+(f^e&(n^f))+o[0]+3614090360&4294967295,h=f+(n^(r=e+(h<<7&4294967295|h>>>25))&(e^n))+o[1]+3905402710&4294967295,f=r+(h<<12&4294967295|h>>>20),h=n+(e^f&(r^e))+o[2]+606105819&4294967295,h=e+(r^(n=f+(h<<17&4294967295|h>>>15))&(f^r))+o[3]+3250441966&4294967295,h=r+(f^(e=n+(h<<22&4294967295|h>>>10))&(n^f))+o[4]+4118548399&4294967295,h=f+(n^(r=e+(h<<7&4294967295|h>>>25))&(e^n))+o[5]+1200080426&4294967295,f=r+(h<<12&4294967295|h>>>20),h=n+(e^f&(r^e))+o[6]+2821735955&4294967295,h=e+(r^(n=f+(h<<17&4294967295|h>>>15))&(f^r))+o[7]+4249261313&4294967295,h=r+(f^(e=n+(h<<22&4294967295|h>>>10))&(n^f))+o[8]+1770035416&4294967295,h=f+(n^(r=e+(h<<7&4294967295|h>>>25))&(e^n))+o[9]+2336552879&4294967295,f=r+(h<<12&4294967295|h>>>20),h=n+(e^f&(r^e))+o[10]+4294925233&4294967295,h=e+(r^(n=f+(h<<17&4294967295|h>>>15))&(f^r))+o[11]+2304563134&4294967295,h=r+(f^(e=n+(h<<22&4294967295|h>>>10))&(n^f))+o[12]+1804603682&4294967295,h=f+(n^(r=e+(h<<7&4294967295|h>>>25))&(e^n))+o[13]+4254626195&4294967295,f=r+(h<<12&4294967295|h>>>20),h=n+(e^f&(r^e))+o[14]+2792965006&4294967295,h=e+(r^(n=f+(h<<17&4294967295|h>>>15))&(f^r))+o[15]+1236535329&4294967295,h=r+(n^f&((e=n+(h<<22&4294967295|h>>>10))^n))+o[1]+4129170786&4294967295,h=f+(e^n&((r=e+(h<<5&4294967295|h>>>27))^e))+o[6]+3225465664&4294967295,f=r+(h<<9&4294967295|h>>>23),h=n+(r^e&(f^r))+o[11]+643717713&4294967295,h=e+(f^r&((n=f+(h<<14&4294967295|h>>>18))^f))+o[0]+3921069994&4294967295,h=r+(n^f&((e=n+(h<<20&4294967295|h>>>12))^n))+o[5]+3593408605&4294967295,h=f+(e^n&((r=e+(h<<5&4294967295|h>>>27))^e))+o[10]+38016083&4294967295,f=r+(h<<9&4294967295|h>>>23),h=n+(r^e&(f^r))+o[15]+3634488961&4294967295,h=e+(f^r&((n=f+(h<<14&4294967295|h>>>18))^f))+o[4]+3889429448&4294967295,h=r+(n^f&((e=n+(h<<20&4294967295|h>>>12))^n))+o[9]+568446438&4294967295,h=f+(e^n&((r=e+(h<<5&4294967295|h>>>27))^e))+o[14]+3275163606&4294967295,f=r+(h<<9&4294967295|h>>>23),h=n+(r^e&(f^r))+o[3]+4107603335&4294967295,h=e+(f^r&((n=f+(h<<14&4294967295|h>>>18))^f))+o[8]+1163531501&4294967295,h=r+(n^f&((e=n+(h<<20&4294967295|h>>>12))^n))+o[13]+2850285829&4294967295,h=f+(e^n&((r=e+(h<<5&4294967295|h>>>27))^e))+o[2]+4243563512&4294967295,f=r+(h<<9&4294967295|h>>>23),h=n+(r^e&(f^r))+o[7]+1735328473&4294967295,h=e+(f^r&((n=f+(h<<14&4294967295|h>>>18))^f))+o[12]+2368359562&4294967295,h=r+((e=n+(h<<20&4294967295|h>>>12))^n^f)+o[5]+4294588738&4294967295,h=f+((r=e+(h<<4&4294967295|h>>>28))^e^n)+o[8]+2272392833&4294967295,f=r+(h<<11&4294967295|h>>>21),h=n+(f^r^e)+o[11]+1839030562&4294967295,h=e+((n=f+(h<<16&4294967295|h>>>16))^f^r)+o[14]+4259657740&4294967295,h=r+((e=n+(h<<23&4294967295|h>>>9))^n^f)+o[1]+2763975236&4294967295,h=f+((r=e+(h<<4&4294967295|h>>>28))^e^n)+o[4]+1272893353&4294967295,f=r+(h<<11&4294967295|h>>>21),h=n+(f^r^e)+o[7]+4139469664&4294967295,h=e+((n=f+(h<<16&4294967295|h>>>16))^f^r)+o[10]+3200236656&4294967295,h=r+((e=n+(h<<23&4294967295|h>>>9))^n^f)+o[13]+681279174&4294967295,h=f+((r=e+(h<<4&4294967295|h>>>28))^e^n)+o[0]+3936430074&4294967295,f=r+(h<<11&4294967295|h>>>21),h=n+(f^r^e)+o[3]+3572445317&4294967295,h=e+((n=f+(h<<16&4294967295|h>>>16))^f^r)+o[6]+76029189&4294967295,h=r+((e=n+(h<<23&4294967295|h>>>9))^n^f)+o[9]+3654602809&4294967295,h=f+((r=e+(h<<4&4294967295|h>>>28))^e^n)+o[12]+3873151461&4294967295,f=r+(h<<11&4294967295|h>>>21),h=n+(f^r^e)+o[15]+530742520&4294967295,h=e+((n=f+(h<<16&4294967295|h>>>16))^f^r)+o[2]+3299628645&4294967295,h=r+(n^((e=n+(h<<23&4294967295|h>>>9))|~f))+o[0]+4096336452&4294967295,h=f+(e^((r=e+(h<<6&4294967295|h>>>26))|~n))+o[7]+1126891415&4294967295,f=r+(h<<10&4294967295|h>>>22),h=n+(r^(f|~e))+o[14]+2878612391&4294967295,h=e+(f^((n=f+(h<<15&4294967295|h>>>17))|~r))+o[5]+4237533241&4294967295,h=r+(n^((e=n+(h<<21&4294967295|h>>>11))|~f))+o[12]+1700485571&4294967295,h=f+(e^((r=e+(h<<6&4294967295|h>>>26))|~n))+o[3]+2399980690&4294967295,f=r+(h<<10&4294967295|h>>>22),h=n+(r^(f|~e))+o[10]+4293915773&4294967295,h=e+(f^((n=f+(h<<15&4294967295|h>>>17))|~r))+o[1]+2240044497&4294967295,h=r+(n^((e=n+(h<<21&4294967295|h>>>11))|~f))+o[8]+1873313359&4294967295,h=f+(e^((r=e+(h<<6&4294967295|h>>>26))|~n))+o[15]+4264355552&4294967295,f=r+(h<<10&4294967295|h>>>22),h=n+(r^(f|~e))+o[6]+2734768916&4294967295,h=e+(f^((n=f+(h<<15&4294967295|h>>>17))|~r))+o[13]+1309151649&4294967295,h=r+(n^((e=n+(h<<21&4294967295|h>>>11))|~f))+o[4]+4149444226&4294967295,h=f+(e^((r=e+(h<<6&4294967295|h>>>26))|~n))+o[11]+3174756917&4294967295,f=r+(h<<10&4294967295|h>>>22),h=n+(r^(f|~e))+o[2]+718787259&4294967295,h=e+(f^((n=f+(h<<15&4294967295|h>>>17))|~r))+o[9]+3951481745&4294967295,t.g[0]=t.g[0]+r&4294967295,t.g[1]=t.g[1]+(n+(h<<21&4294967295|h>>>11))&4294967295,t.g[2]=t.g[2]+n&4294967295,t.g[3]=t.g[3]+f&4294967295}function f(t,r){var e=u;return Object.prototype.hasOwnProperty.call(e,t)?e[t]:e[t]=r(t)}function s(t,r){this.h=r;const e=[];let o=!0;for(let n=t.length-1;n>=0;n--){const h=0|t[n];o&&h==r||(e[n]=h,o=!1)}this.g=e}!(function(t,r){function e(){}e.prototype=r.prototype,t.F=r.prototype,t.prototype=new e,t.prototype.constructor=t,t.D=function(t,e,o){for(var n=Array(arguments.length-2),h=2;h<arguments.length;h++)n[h-2]=arguments[h];return r.prototype[e].apply(t,n)}})(n,function(){this.blockSize=-1}),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},n.prototype.v=function(t,r){void 0===r&&(r=t.length);const e=r-this.blockSize,o=this.C;let n=this.h,f=0;for(;f<r;){if(0==n)for(;f<=e;)h(this,t,f),f+=this.blockSize;if("string"==typeof t){for(;f<r;)if(o[n++]=t.charCodeAt(f++),n==this.blockSize){h(this,o),n=0;break}}else for(;f<r;)if(o[n++]=t[f++],n==this.blockSize){h(this,o),n=0;break}}this.h=n,this.o+=r},n.prototype.A=function(){var t=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var r=1;r<t.length-8;++r)t[r]=0;r=8*this.o;for(var e=t.length-8;e<t.length;++e)t[e]=255&r,r/=256;for(this.v(t),t=Array(16),r=0,e=0;e<4;++e)for(let o=0;o<32;o+=8)t[r++]=this.g[e]>>>o&255;return t};var u={};function g(t){return-128<=t&&t<128?f(t,function(t){return new s([0|t],t<0?-1:0)}):new s([0|t],t<0?-1:0)}function l(t){if(isNaN(t)||!isFinite(t))return c;if(t<0)return w(l(-t));const r=[];let e=1;for(let o=0;t>=e;o++)r[o]=t/e|0,e*=4294967296;return new s(r,0)}var c=g(0),p=g(1),a=g(16777216);function d(t){if(0!=t.h)return!1;for(let r=0;r<t.g.length;r++)if(0!=t.g[r])return!1;return!0}function y(t){return-1==t.h}function w(t){const r=t.g.length,e=[];for(let o=0;o<r;o++)e[o]=~t.g[o];return new s(e,~t.h).add(p)}function b(t,r){return t.add(w(r))}function m(t,r){for(;(65535&t[r])!=t[r];)t[r+1]+=t[r]>>>16,t[r]&=65535,r++}function v(t,r){this.g=t,this.h=r}function M(t,r){if(d(r))throw Error("division by zero");if(d(t))return new v(c,c);if(y(t))return r=M(w(t),r),new v(w(r.g),w(r.h));if(y(r))return r=M(t,w(r)),new v(w(r.g),r.h);if(t.g.length>30){if(y(t)||y(r))throw Error("slowDivide_ only works with positive integers.");for(var e=p,o=r;o.l(t)<=0;)e=j(e),o=j(o);var n=S(e,1),h=S(o,1);for(o=S(o,2),e=S(e,2);!d(o);){var f=h.add(o);f.l(t)<=0&&(n=n.add(e),h=f),o=S(o,1),e=S(e,1)}return r=b(t,n.j(r)),new v(n,r)}for(n=c;t.l(r)>=0;){for(e=Math.max(1,Math.floor(t.m()/r.m())),o=(o=Math.ceil(Math.log(e)/Math.LN2))<=48?1:Math.pow(2,o-48),f=(h=l(e)).j(r);y(f)||f.l(t)>0;)f=(h=l(e-=o)).j(r);d(h)&&(h=p),n=n.add(h),t=b(t,f)}return new v(n,t)}function j(t){const r=t.g.length+1,e=[];for(let o=0;o<r;o++)e[o]=t.i(o)<<1|t.i(o-1)>>>31;return new s(e,t.h)}function S(t,r){const e=r>>5;r%=32;const o=t.g.length-e,n=[];for(let h=0;h<o;h++)n[h]=r>0?t.i(h+e)>>>r|t.i(h+e+1)<<32-r:t.i(h+e);return new s(n,t.h)}(e=s.prototype).m=function(){if(y(this))return-w(this).m();let t=0,r=1;for(let e=0;e<this.g.length;e++){const o=this.i(e);t+=(o>=0?o:4294967296+o)*r,r*=4294967296}return t},e.toString=function(t){if((t=t||10)<2||36<t)throw Error("radix out of range: "+t);if(d(this))return"0";if(y(this))return"-"+w(this).toString(t);const r=l(Math.pow(t,6));var e=this;let o="";for(;;){const n=M(e,r).g;let h=(((e=b(e,n.j(r))).g.length>0?e.g[0]:e.h)>>>0).toString(t);if(d(e=n))return h+o;for(;h.length<6;)h="0"+h;o=h+o}},e.i=function(t){return t<0?0:t<this.g.length?this.g[t]:this.h},e.l=function(t){return y(t=b(this,t))?-1:d(t)?0:1},e.abs=function(){return y(this)?w(this):this},e.add=function(t){const r=Math.max(this.g.length,t.g.length),e=[];let o=0;for(let n=0;n<=r;n++){let r=o+(65535&this.i(n))+(65535&t.i(n)),h=(r>>>16)+(this.i(n)>>>16)+(t.i(n)>>>16);o=h>>>16,r&=65535,h&=65535,e[n]=h<<16|r}return new s(e,-2147483648&e[e.length-1]?-1:0)},e.j=function(t){if(d(this)||d(t))return c;if(y(this))return y(t)?w(this).j(w(t)):w(w(this).j(t));if(y(t))return w(this.j(w(t)));if(this.l(a)<0&&t.l(a)<0)return l(this.m()*t.m());const r=this.g.length+t.g.length,e=[];for(var o=0;o<2*r;o++)e[o]=0;for(o=0;o<this.g.length;o++)for(let r=0;r<t.g.length;r++){const n=this.i(o)>>>16,h=65535&this.i(o),f=t.i(r)>>>16,s=65535&t.i(r);e[2*o+2*r]+=h*s,m(e,2*o+2*r),e[2*o+2*r+1]+=n*s,m(e,2*o+2*r+1),e[2*o+2*r+1]+=h*f,m(e,2*o+2*r+1),e[2*o+2*r+2]+=n*f,m(e,2*o+2*r+2)}for(t=0;t<r;t++)e[t]=e[2*t+1]<<16|e[2*t];for(t=r;t<2*r;t++)e[t]=0;return new s(e,0)},e.B=function(t){return M(this,t).h},e.and=function(t){const r=Math.max(this.g.length,t.g.length),e=[];for(let o=0;o<r;o++)e[o]=this.i(o)&t.i(o);return new s(e,this.h&t.h)},e.or=function(t){const r=Math.max(this.g.length,t.g.length),e=[];for(let o=0;o<r;o++)e[o]=this.i(o)|t.i(o);return new s(e,this.h|t.h)},e.xor=function(t){const r=Math.max(this.g.length,t.g.length),e=[];for(let o=0;o<r;o++)e[o]=this.i(o)^t.i(o);return new s(e,this.h^t.h)},n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,r=o.Md5=n,s.prototype.add=s.prototype.add,s.prototype.multiply=s.prototype.j,s.prototype.modulo=s.prototype.B,s.prototype.compare=s.prototype.l,s.prototype.toNumber=s.prototype.m,s.prototype.toString=s.prototype.toString,s.prototype.getBits=s.prototype.i,s.fromNumber=l,s.fromString=function t(r,e){if(0==r.length)throw Error("number format error: empty string");if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if("-"==r.charAt(0))return w(t(r.substring(1),e));if(r.indexOf("-")>=0)throw Error('number format error: interior "-" character');const o=l(Math.pow(e,8));let n=c;for(let t=0;t<r.length;t+=8){var h=Math.min(8,r.length-t);const f=parseInt(r.substring(t,t+h),e);h<8?(h=l(Math.pow(e,h)),n=n.j(h).add(l(f))):(n=n.j(o),n=n.add(l(f)))}return n},t=o.Integer=s}).apply(void 0!==e?e:'undefined'!=typeof self?self:'undefined'!=typeof window?window:{})},1326,[]);
__d(function(_g,_r,i,_a,_m,_e,_d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),Object.defineProperty(_e,"ErrorCode",{enumerable:!0,get:function(){return o}}),Object.defineProperty(_e,"Event",{enumerable:!0,get:function(){return h}}),Object.defineProperty(_e,"EventType",{enumerable:!0,get:function(){return s}}),Object.defineProperty(_e,"FetchXmlHttpFactory",{enumerable:!0,get:function(){return e}}),Object.defineProperty(_e,"Stat",{enumerable:!0,get:function(){return r}}),Object.defineProperty(_e,"WebChannel",{enumerable:!0,get:function(){return n}}),Object.defineProperty(_e,"XhrIo",{enumerable:!0,get:function(){return t}}),Object.defineProperty(_e,"createWebChannelTransport",{enumerable:!0,get:function(){return l}}),Object.defineProperty(_e,"default",{enumerable:!0,get:function(){return c}}),Object.defineProperty(_e,"getStatEventTarget",{enumerable:!0,get:function(){return a}});var t,e,n,s,o,r,h,a,l,u='undefined'!=typeof globalThis?globalThis:'undefined'!=typeof window?window:void 0!==_g?_g:'undefined'!=typeof self?self:{},c={};(function(){var f,g=Object.defineProperty;var p=(function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof u&&u];for(var e=0;e<t.length;++e){var n=t[e];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")})(this);function d(t,e){if(e)t:{var n=p;t=t.split(".");for(var s=0;s<t.length-1;s++){var o=t[s];if(!(o in n))break t;n=n[o]}(e=e(s=n[t=t[t.length-1]]))!=s&&null!=e&&g(n,t,{configurable:!0,writable:!0,value:e})}}d("Symbol.dispose",function(t){return t||Symbol("Symbol.dispose")}),d("Array.prototype.values",function(t){return t||function(){return this[Symbol.iterator]()}}),d("Object.entries",function(t){return t||function(t){var e,n=[];for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.push([e,t[e]]);return n}});
/** @license
        Copyright The Closure Library Authors.
        SPDX-License-Identifier: Apache-2.0
        */
var y=y||{},v=this||self;function m(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function b(t,e,n){return t.call.apply(t.bind,arguments)}function w(t,e,n){return(w=b).apply(null,arguments)}function T(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function j(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Ob=function(t,n,s){for(var o=Array(arguments.length-2),r=2;r<arguments.length;r++)o[r-2]=arguments[r];return e.prototype[n].apply(t,o)}}var S="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?t=>t&&AsyncContext.Snapshot.wrap(t):t=>t;function E(t){const e=t.length;if(e>0){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function C(t,e){for(let e=1;e<arguments.length;e++){const s=arguments[e];var n=typeof s;if("array"==(n="object"!=n?n:s?Array.isArray(s)?"array":n:"null")||"object"==n&&"number"==typeof s.length){n=t.length||0;const e=s.length||0;t.length=n+e;for(let o=0;o<e;o++)t[n+o]=s[o]}else t.push(s)}}function A(t){v.setTimeout(()=>{throw t},0)}function O(){var t=_;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var P=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return this.h>0?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new R,t=>t.reset());class R{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}let I,x=!1,_=new class{constructor(){this.h=this.g=null}add(t,e){const n=P.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},D=()=>{const t=Promise.resolve(void 0);I=()=>{t.then(M)}};function M(){for(var t;t=O();){try{t.h.call(t.g)}catch(t){A(t)}var e=P;e.j(t),e.h<100&&(e.h++,t.next=e.g,e.g=t)}x=!1}function L(){this.u=this.u,this.C=this.C}function H(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}L.prototype.u=!1,L.prototype.dispose=function(){this.u||(this.u=!0,this.N())},L.prototype[Symbol.dispose]=function(){this.dispose()},L.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},H.prototype.h=function(){this.defaultPrevented=!0};var X=(function(){if(!v.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const t=()=>{};v.addEventListener("test",t,e),v.removeEventListener("test",t,e)}catch(t){}return t})();function k(t){return/^[\s\xa0]*$/.test(t)}function B(t,e){H.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t&&this.init(t,e)}j(B,H),B.prototype.init=function(t,e){const n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;this.target=t.target||t.srcElement,this.g=e,(e=t.relatedTarget)||("mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement)),this.relatedTarget=e,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=t.pointerType,this.state=t.state,this.i=t,t.defaultPrevented&&B.Z.h.call(this)},B.prototype.h=function(){B.Z.h.call(this);const t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var F="closure_listenable_"+(1e6*Math.random()|0),N=0;function K(t,e,n,s,o){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.ha=o,this.key=++N,this.da=this.fa=!1}function U(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Y(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function G(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function J(t){const e={};for(const n in t)e[n]=t[n];return e}const W="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function q(t,e){let n,s;for(let e=1;e<arguments.length;e++){for(n in s=arguments[e],s)t[n]=s[n];for(let e=0;e<W.length;e++)n=W[e],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function V(t){this.src=t,this.g={},this.h=0}function z(t,e){const n=e.type;if(n in t.g){var s,o=t.g[n],r=Array.prototype.indexOf.call(o,e,void 0);(s=r>=0)&&Array.prototype.splice.call(o,r,1),s&&(U(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function Z(t,e,n,s){for(let o=0;o<t.length;++o){const r=t[o];if(!r.da&&r.listener==e&&r.capture==!!n&&r.ha==s)return o}return-1}V.prototype.add=function(t,e,n,s,o){const r=t.toString();(t=this.g[r])||(t=this.g[r]=[],this.h++);const h=Z(t,e,s,o);return h>-1?(e=t[h],n||(e.fa=!1)):((e=new K(e,this.src,r,!!s,o)).fa=n,t.push(e)),e};var $="closure_lm_"+(1e6*Math.random()|0),Q={};function tt(t,e,n,s,o){if(s&&s.once)return it(t,e,n,s,o);if(Array.isArray(e)){for(let r=0;r<e.length;r++)tt(t,e[r],n,s,o);return null}return n=ut(n),t&&t[F]?t.J(e,n,m(s)?!!s.capture:!!s,o):et(t,e,n,!1,s,o)}function et(t,e,n,s,o,r){if(!e)throw Error("Invalid event type");const h=m(o)?!!o.capture:!!o;let a=at(t);if(a||(t[$]=a=new V(t)),(n=a.add(e,n,s,h,r)).proxy)return n;if(s=nt(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)X||(o=h),void 0===o&&(o=!1),t.addEventListener(e.toString(),s,o);else if(t.attachEvent)t.attachEvent(rt(e.toString()),s);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(s)}return n}function nt(){const t=ht;return function e(n){return t.call(e.src,e.listener,n)}}function it(t,e,n,s,o){if(Array.isArray(e)){for(let r=0;r<e.length;r++)it(t,e[r],n,s,o);return null}return n=ut(n),t&&t[F]?t.K(e,n,m(s)?!!s.capture:!!s,o):et(t,e,n,!0,s,o)}function st(t,e,n,s,o){if(Array.isArray(e))for(var r=0;r<e.length;r++)st(t,e[r],n,s,o);else s=m(s)?!!s.capture:!!s,n=ut(n),t&&t[F]?(t=t.i,(r=String(e).toString())in t.g&&((n=Z(e=t.g[r],n,s,o))>-1&&(U(e[n]),Array.prototype.splice.call(e,n,1),0==e.length&&(delete t.g[r],t.h--)))):t&&(t=at(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Z(e,n,s,o)),(n=t>-1?e[t]:null)&&ot(n))}function ot(t){if("number"!=typeof t&&t&&!t.da){var e=t.src;if(e&&e[F])z(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(rt(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=at(e))?(z(n,t),0==n.h&&(n.src=null,e[$]=null)):U(t)}}}function rt(t){return t in Q?Q[t]:Q[t]="on"+t}function ht(t,e){if(t.da)t=!0;else{e=new B(e,this);const n=t.listener,s=t.ha||t.src;t.fa&&ot(t),t=n.call(s,e)}return t}function at(t){return(t=t[$])instanceof V?t:null}var lt="__closure_events_fn_"+(1e9*Math.random()>>>0);function ut(t){return"function"==typeof t?t:(t[lt]||(t[lt]=function(e){return t.handleEvent(e)}),t[lt])}function ct(){L.call(this),this.i=new V(this),this.M=this,this.G=null}function ft(t,e){var n,s=t.G;if(s)for(n=[];s;s=s.G)n.push(s);if(t=t.M,s=e.type||e,"string"==typeof e)e=new H(e,t);else if(e instanceof H)e.target=e.target||t;else{var o=e;q(e=new H(s,t),o)}let r,h;if(o=!0,n)for(h=n.length-1;h>=0;h--)r=e.g=n[h],o=gt(r,s,!0,e)&&o;if(r=e.g=t,o=gt(r,s,!0,e)&&o,o=gt(r,s,!1,e)&&o,n)for(h=0;h<n.length;h++)r=e.g=n[h],o=gt(r,s,!1,e)&&o}function gt(t,e,n,s){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();let o=!0;for(let r=0;r<e.length;++r){const h=e[r];if(h&&!h.da&&h.capture==n){const e=h.listener,n=h.ha||h.src;h.fa&&z(t.i,h),o=!1!==e.call(n,s)&&o}}return o&&!s.defaultPrevented}function pt(t,e){if("function"!=typeof t){if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=w(t.handleEvent,t)}return Number(e)>2147483647?-1:v.setTimeout(t,e||0)}function dt(t){t.g=pt(()=>{t.g=null,t.i&&(t.i=!1,dt(t))},t.l);const e=t.h;t.h=null,t.m.apply(null,e)}j(ct,L),ct.prototype[F]=!0,ct.prototype.removeEventListener=function(t,e,n,s){st(this,t,e,n,s)},ct.prototype.N=function(){if(ct.Z.N.call(this),this.i){var t=this.i;for(const e in t.g){const n=t.g[e];for(let t=0;t<n.length;t++)U(n[t]);delete t.g[e],t.h--}}this.G=null},ct.prototype.J=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)},ct.prototype.K=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};class yt extends L{constructor(t,e){super(),this.m=t,this.l=e,this.h=null,this.i=!1,this.g=null}j(t){this.h=arguments,this.g?this.i=!0:dt(this)}N(){super.N(),this.g&&(v.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vt(t){L.call(this),this.h=t,this.g={}}j(vt,L);var mt=[];function bt(t){Y(t.g,function(t,e){this.g.hasOwnProperty(e)&&ot(t)},t),t.g={}}vt.prototype.N=function(){vt.Z.N.call(this),bt(this)},vt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wt=v.JSON.stringify,Tt=v.JSON.parse,jt=class{stringify(t){return v.JSON.stringify(t,void 0)}parse(t){return v.JSON.parse(t,void 0)}};function St(){}function Et(){}var Ct={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function At(){H.call(this,"d")}function Ot(){H.call(this,"c")}j(At,H),j(Ot,H);var Pt={},Rt=null;function It(){return Rt=Rt||new ct}function xt(t){H.call(this,Pt.Ia,t)}function _t(t){const e=It();ft(e,new xt(e))}function Dt(t,e){H.call(this,Pt.STAT_EVENT,t),this.stat=e}function Mt(t){const e=It();ft(e,new Dt(e,t))}function Lt(t,e){H.call(this,Pt.Ja,t),this.size=e}function Ht(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return v.setTimeout(function(){t()},e)}function Xt(){this.g=!0}function kt(t,e,n,s,o,r){t.info(function(){if(t.g)if(r){var h="",a=r.split("&");for(let t=0;t<a.length;t++){var l=a[t].split("=");if(l.length>1){const t=l[0];l=l[1];const e=t.split("_");h=e.length>=2&&"type"==e[1]?h+(t+"=")+l+"&":h+(t+"=redacted&")}}}else h=null;else h=r;return"XMLHTTP REQ ("+s+") [attempt "+o+"]: "+e+"\n"+n+"\n"+h})}function Bt(t,e,n,s,o,r,h){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+o+"]: "+e+"\n"+n+"\n"+r+" "+h})}function Ft(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+Kt(t,n)+(s?" "+s:"")})}function Nt(t,e){t.info(function(){return"TIMEOUT: "+e})}function Kt(t,e){if(!t.g)return e;if(!e)return null;try{const r=JSON.parse(e);if(r)for(t=0;t<r.length;t++)if(Array.isArray(r[t])){var n=r[t];if(!(n.length<2)){var s=n[1];if(Array.isArray(s)&&!(s.length<1)){var o=s[0];if("noop"!=o&&"stop"!=o&&"close"!=o)for(let t=1;t<s.length;t++)s[t]=""}}}return wt(r)}catch(t){return e}}Pt.Ia="serverreachability",j(xt,H),Pt.STAT_EVENT="statevent",j(Dt,H),Pt.Ja="timingevent",j(Lt,H),Xt.prototype.ua=function(){this.g=!1},Xt.prototype.info=function(){};var Ut,Yt={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Gt={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Jt(){}function Wt(t){return encodeURIComponent(String(t))}function qt(t){var e=1;t=t.split(":");const n=[];for(;e>0&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function Vt(t,e,n,s){this.j=t,this.i=e,this.l=n,this.S=s||1,this.V=new vt(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new zt}function zt(){this.i=null,this.g="",this.h=!1}j(Jt,St),Jt.prototype.g=function(){return new XMLHttpRequest},Ut=new Jt;var Zt={},$t={};function Qt(t,e,n){t.M=1,t.A=Ae(Te(e)),t.u=n,t.R=!0,te(t,null)}function te(t,e){t.F=Date.now(),se(t),t.B=Te(t.A);var n=t.B,s=t.S;Array.isArray(s)||(s=[String(s)]),Ne(n.i,"t",s),t.C=0,n=t.j.L,t.h=new zt,t.g=Dn(t.j,n?e:null,!t.u),t.P>0&&(t.O=new yt(w(t.Y,t,t.g),t.P)),e=t.V,n=t.g,s=t.ba;var o="readystatechange";Array.isArray(o)||(o&&(mt[0]=o.toString()),o=mt);for(let t=0;t<o.length;t++){const r=tt(n,o[t],s||e.handleEvent,!1,e.h||e);if(!r)break;e.g[r.key]=r}e=t.J?J(t.J):{},t.u?(t.v||(t.v="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.B,t.v,t.u,e)):(t.v="GET",t.g.ea(t.B,t.v,null,e)),_t(),kt(t.i,t.v,t.B,t.l,t.S,t.u)}function ee(t){if(!ne(t))return t.g.la();const e=cn(t.g);if(""===e)return"";let n="";const s=e.length,o=4==un(t.g);if(!t.h.i){if("undefined"==typeof TextDecoder)return ae(t),he(t),"";t.h.i=new v.TextDecoder}for(let r=0;r<s;r++)t.h.h=!0,n+=t.h.i.decode(e[r],{stream:!(o&&r==s-1)});return e.length=0,t.h.g+=n,t.C=0,t.h.g}function ne(t){return!!t.g&&("GET"==t.v&&2!=t.M&&t.j.Aa)}function ie(t,e){var n=t.C,s=e.indexOf("\n",n);return-1==s?$t:(n=Number(e.substring(n,s)),isNaN(n)?Zt:(s+=1)+n>e.length?$t:(e=e.slice(s,s+n),t.C=s+n,e))}function se(t){t.T=Date.now()+t.H,oe(t,t.H)}function oe(t,e){if(null!=t.D)throw Error("WatchDog timer not null");t.D=Ht(w(t.aa,t),e)}function re(t){t.D&&(v.clearTimeout(t.D),t.D=null)}function he(t){0==t.j.I||t.K||Pn(t.j,t)}function ae(t){re(t);var e=t.O;e&&"function"==typeof e.dispose&&e.dispose(),t.O=null,bt(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.dispose())}function le(t,e){try{var n=t.j;if(0!=n.I&&(n.g==t||pe(n.h,t)))if(!t.L&&pe(n.h,t)&&3==n.I){try{var s=n.Ba.g.parse(e)}catch(t){s=null}if(Array.isArray(s)&&3==s.length){var o=s;if(0==o[0]){t:if(!n.v){if(n.g){if(!(n.g.F+3e3<t.F))break t;On(n),yn(n)}En(n),Mt(18)}}else n.xa=o[1],0<n.xa-n.K&&o[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=Ht(w(n.Va,n),6e3));ge(n.h)<=1&&n.ta&&(n.ta=void 0)}else In(n,11)}else if((t.L||n.g==t)&&On(n),!k(e))for(o=n.Ba.g.parse(e),e=0;e<o.length;e++){let u=o[e];const c=u[0];if(!(c<=n.K))if(n.K=c,u=u[1],2==n.I)if("c"==u[0]){n.M=u[1],n.ba=u[2];const e=u[3];null!=e&&(n.ka=e,n.j.info("VER="+n.ka));const o=u[4];null!=o&&(n.za=o,n.j.info("SVER="+n.za));const c=u[5];null!=c&&"number"==typeof c&&c>0&&(s=1.5*c,n.O=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const f=t.g;if(f){const t=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var r=s.h;r.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(de(r,r.h),r.h=null))}if(s.G){const t=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(s.wa=t,Ce(s.J,s.G,t))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-t.F,n.j.info("Handshake RTT: "+n.T+"ms"));var h=t;if((s=n).na=_n(s,s.L?s.ba:null,s.W),h.L){ye(s.h,h);var a=h,l=s.O;l&&(a.H=l),a.D&&(re(a),se(a)),s.g=h}else Sn(s);n.i.length>0&&mn(n)}else"stop"!=u[0]&&"close"!=u[0]||In(n,7);else 3==n.I&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?In(n,7):dn(n):"noop"!=u[0]&&n.l&&n.l.qa(u),n.A=0)}_t()}catch(t){}}Vt.prototype.ba=function(t){t=t.target;const e=this.O;e&&3==un(t)?e.j():this.Y(t)},Vt.prototype.Y=function(t){try{if(t==this.g)t:{const a=un(this.g),l=this.g.ya();this.g.ca();if(!(a<3)&&(3!=a||this.g&&(this.h.h||this.g.la()||cn(this.g)))){this.K||4!=a||7==l||_t(),re(this);var e=this.g.ca();this.X=e;var n=ee(this);if(this.o=200==e,Bt(this.i,this.v,this.B,this.l,this.S,a,e),this.o){if(this.U&&!this.L){e:{if(this.g){var s,o=this.g;if((s=o.g?o.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!k(s)){var r=s;break e}}r=null}if(!(t=r)){this.o=!1,this.m=3,Mt(12),ae(this),he(this);break t}Ft(this.i,this.l,t,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,le(this,t)}if(this.R){let e;for(t=!0;!this.K&&this.C<n.length;){if(e=ie(this,n),e==$t){4==a&&(this.m=4,Mt(14),t=!1),Ft(this.i,this.l,null,"[Incomplete Response]");break}if(e==Zt){this.m=4,Mt(15),Ft(this.i,this.l,n,"[Invalid Chunk]"),t=!1;break}Ft(this.i,this.l,e,null),le(this,e)}if(ne(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=a||0!=n.length||this.h.h||(this.m=1,Mt(16),t=!1),this.o=this.o&&t,t){if(n.length>0&&!this.W){this.W=!0;var h=this.j;h.g==this&&h.aa&&!h.P&&(h.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Cn(h),h.P=!0,Mt(11))}}else Ft(this.i,this.l,n,"[Invalid Chunked Response]"),ae(this),he(this)}else Ft(this.i,this.l,n,null),le(this,n);4==a&&ae(this),this.o&&!this.K&&(4==a?Pn(this.j,this):(this.o=!1,se(this)))}else fn(this.g),400==e&&n.indexOf("Unknown SID")>0?(this.m=3,Mt(12)):(this.m=0,Mt(13)),ae(this),he(this)}}}catch(t){}},Vt.prototype.cancel=function(){this.K=!0,ae(this)},Vt.prototype.aa=function(){this.D=null;const t=Date.now();t-this.T>=0?(Nt(this.i,this.B),2!=this.M&&(_t(),Mt(17)),ae(this),this.m=2,he(this)):oe(this,this.T-t)};var ue=class{constructor(t,e){this.g=t,this.map=e}};function ce(t){this.l=t||10,v.PerformanceNavigationTiming?t=(t=v.performance.getEntriesByType("navigation")).length>0&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(v.chrome&&v.chrome.loadTimes&&v.chrome.loadTimes()&&v.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function fe(t){return!!t.h||!!t.g&&t.g.size>=t.j}function ge(t){return t.h?1:t.g?t.g.size:0}function pe(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function de(t,e){t.g?t.g.add(e):t.h=e}function ye(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function ve(t){if(null!=t.h)return t.i.concat(t.h.G);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.G);return e}return E(t.i)}ce.prototype.cancel=function(){if(this.i=ve(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var me=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function be(t,e){if(t){t=t.split("&");for(let n=0;n<t.length;n++){const s=t[n].indexOf("=");let o,r=null;s>=0?(o=t[n].substring(0,s),r=t[n].substring(s+1)):o=t[n],e(o,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function we(t){let e;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,t instanceof we?(this.l=t.l,je(this,t.j),this.o=t.o,this.g=t.g,Se(this,t.u),this.h=t.h,Ee(this,Ke(t.i)),this.m=t.m):t&&(e=String(t).match(me))?(this.l=!1,je(this,e[1]||"",!0),this.o=Oe(e[2]||""),this.g=Oe(e[3]||"",!0),Se(this,e[4]),this.h=Oe(e[5]||"",!0),Ee(this,e[6]||"",!0),this.m=Oe(e[7]||"")):(this.l=!1,this.i=new He(null,this.l))}function Te(t){return new we(t)}function je(t,e,n){t.j=n?Oe(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Se(t,e){if(e){if(e=Number(e),isNaN(e)||e<0)throw Error("Bad port number "+e);t.u=e}else t.u=null}function Ee(t,e,n){e instanceof He?(t.i=e,Ye(t.i,t.l)):(n||(e=Pe(e,Me)),t.i=new He(e,t.l))}function Ce(t,e,n){t.i.set(e,n)}function Ae(t){return Ce(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Oe(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Pe(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,Re),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Re(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}we.prototype.toString=function(){const t=[];var e=this.j;e&&t.push(Pe(e,Ie,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.o)&&t.push(Pe(e,Ie,!0),"@"),t.push(Wt(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&t.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(Pe(n,"/"==n.charAt(0)?De:xe,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.m)&&t.push("#",Pe(n,Le)),t.join("")},we.prototype.resolve=function(t){const e=Te(this);let n=!!t.j;n?je(e,t.j):n=!!t.o,n?e.o=t.o:n=!!t.g,n?e.g=t.g:n=null!=t.u;var s=t.h;if(n)Se(e,t.u);else if(n=!!t.h){if("/"!=s.charAt(0))if(this.g&&!this.h)s="/"+s;else{var o=e.h.lastIndexOf("/");-1!=o&&(s=e.h.slice(0,o+1)+s)}if(".."==(o=s)||"."==o)s="";else if(-1!=o.indexOf("./")||-1!=o.indexOf("/.")){s=0==o.lastIndexOf("/",0),o=o.split("/");const t=[];for(let e=0;e<o.length;){const n=o[e++];"."==n?s&&e==o.length&&t.push(""):".."==n?((t.length>1||1==t.length&&""!=t[0])&&t.pop(),s&&e==o.length&&t.push("")):(t.push(n),s=!0)}s=t.join("/")}else s=o}return n?e.h=s:n=""!==t.i.toString(),n?Ee(e,Ke(t.i)):n=!!t.m,n&&(e.m=t.m),e};var Ie=/[#\/\?@]/g,xe=/[#\?:]/g,De=/[#\?]/g,Me=/[#\?@]/g,Le=/#/g;function He(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Xe(t){t.g||(t.g=new Map,t.h=0,t.i&&be(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}function ke(t,e){Xe(t),e=Ue(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Be(t,e){return Xe(t),e=Ue(t,e),t.g.has(e)}function Fe(t,e){Xe(t);let n=[];if("string"==typeof e)Be(t,e)&&(n=n.concat(t.g.get(Ue(t,e))));else for(t=Array.from(t.g.values()),e=0;e<t.length;e++)n=n.concat(t[e]);return n}function Ne(t,e,n){ke(t,e),n.length>0&&(t.i=null,t.g.set(Ue(t,e),E(n)),t.h+=n.length)}function Ke(t){const e=new He;return e.i=t.i,t.g&&(e.g=new Map(t.g),e.h=t.h),e}function Ue(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Ye(t,e){e&&!t.j&&(Xe(t),t.i=null,t.g.forEach(function(t,e){const n=e.toLowerCase();e!=n&&(ke(this,e),Ne(this,n,t))},t)),t.j=e}function Ge(t,e){const n=new Xt;if(v.Image){const s=new Image;s.onload=T(We,n,"TestLoadImage: loaded",!0,e,s),s.onerror=T(We,n,"TestLoadImage: error",!1,e,s),s.onabort=T(We,n,"TestLoadImage: abort",!1,e,s),s.ontimeout=T(We,n,"TestLoadImage: timeout",!1,e,s),v.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function Je(t,e){const n=new Xt,s=new AbortController,o=setTimeout(()=>{s.abort(),We(n,"TestPingServer: timeout",!1,e)},1e4);fetch(t,{signal:s.signal}).then(t=>{clearTimeout(o),t.ok?We(n,"TestPingServer: ok",!0,e):We(n,"TestPingServer: server error",!1,e)}).catch(()=>{clearTimeout(o),We(n,"TestPingServer: error",!1,e)})}function We(t,e,n,s,o){try{o&&(o.onload=null,o.onerror=null,o.onabort=null,o.ontimeout=null),s(n)}catch(t){}}function qe(){this.g=new jt}function Ve(t){this.i=t.Sb||null,this.h=t.ab||!1}function ze(t,e){ct.call(this),this.H=t,this.o=e,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Ze(t){t.j.read().then(t.Ma.bind(t)).catch(t.ga.bind(t))}function $e(t){t.readyState=4,t.l=null,t.j=null,t.B=null,Qe(t)}function Qe(t){t.onreadystatechange&&t.onreadystatechange.call(t)}function tn(t){let e="";return Y(t,function(t,n){e+=n,e+=":",e+=t,e+="\r\n"}),e}function en(t,e,n){t:{for(s in n){var s=!1;break t}s=!0}s||(n=tn(n),"string"==typeof t?null!=n&&Wt(n):Ce(t,e,n))}function nn(t){ct.call(this),this.headers=new Map,this.L=t||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(f=He.prototype).add=function(t,e){Xe(this),this.i=null,t=Ue(this,t);let n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},f.forEach=function(t,e){Xe(this),this.g.forEach(function(n,s){n.forEach(function(n){t.call(e,n,s,this)},this)},this)},f.set=function(t,e){return Xe(this),this.i=null,Be(this,t=Ue(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},f.get=function(t,e){return t&&(t=Fe(this,t)).length>0?String(t[0]):e},f.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(let s=0;s<e.length;s++){var n=e[s];const o=Wt(n);n=Fe(this,n);for(let e=0;e<n.length;e++){let s=o;""!==n[e]&&(s+="="+Wt(n[e])),t.push(s)}}return this.i=t.join("&")},j(Ve,St),Ve.prototype.g=function(){return new ze(this.i,this.h)},j(ze,ct),(f=ze.prototype).open=function(t,e){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=t,this.D=e,this.readyState=1,Qe(this)},f.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const e={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};t&&(e.body=t),(this.H||v).fetch(new Request(this.D,e)).then(this.Pa.bind(this),this.ga.bind(this))},f.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,$e(this)),this.readyState=0},f.Pa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Qe(this)),this.g&&(this.readyState=3,Qe(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==v.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ze(this)}else t.text().then(this.Oa.bind(this),this.ga.bind(this))},f.Ma=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var e=t.value?t.value:new Uint8Array(0);(e=this.B.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?$e(this):Qe(this),3==this.readyState&&Ze(this)}},f.Oa=function(t){this.g&&(this.response=this.responseText=t,$e(this))},f.Na=function(t){this.g&&(this.response=t,$e(this))},f.ga=function(){this.g&&$e(this)},f.setRequestHeader=function(t,e){this.A.append(t,e)},f.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},f.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(ze.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}}),j(nn,ct);var sn=/^https?$/i,on=["POST","PUT"];function rn(t,e){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=e,t.o=5,hn(t),ln(t)}function hn(t){t.A||(t.A=!0,ft(t,"complete"),ft(t,"error"))}function an(t){if(t.h&&void 0!==y)if(t.v&&4==un(t))setTimeout(t.Ca.bind(t),0);else if(ft(t,"readystatechange"),4==un(t)){t.h=!1;try{const r=t.ca();t:switch(r){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var s;if(s=0===r){let e=String(t.D).match(me)[1]||null;!e&&v.self&&v.self.location&&(e=v.self.location.protocol.slice(0,-1)),s=!sn.test(e?e.toLowerCase():"")}n=s}if(n)ft(t,"complete"),ft(t,"success");else{t.o=6;try{var o=un(t)>2?t.g.statusText:""}catch(t){o=""}t.l=o+" ["+t.ca()+"]",hn(t)}}finally{ln(t)}}}function ln(t,e){if(t.g){t.m&&(clearTimeout(t.m),t.m=null);const n=t.g;t.g=null,e||ft(t,"ready");try{n.onreadystatechange=null}catch(t){}}}function un(t){return t.g?t.g.readyState:0}function cn(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.F){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(t){return null}}function fn(t){const e={};t=(t.g&&un(t)>=2&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let s=0;s<t.length;s++){if(k(t[s]))continue;var n=qt(t[s]);const o=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const r=e[o]||[];e[o]=r,r.push(n)}G(e,function(t){return t.join(", ")})}function gn(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function pn(t){this.za=0,this.i=[],this.j=new Xt,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gn("failFast",!1,t),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gn("baseRetryDelayMs",5e3,t),this.Za=gn("retryDelaySeedMs",1e4,t),this.Ta=gn("forwardChannelMaxRetries",2,t),this.va=gn("forwardChannelRequestTimeoutMs",2e4,t),this.ma=t&&t.xmlHttpFactory||void 0,this.Ua=t&&t.Rb||void 0,this.Aa=t&&t.useFetchStreams||!1,this.O=void 0,this.L=t&&t.supportsCrossDomainXhr||!1,this.M="",this.h=new ce(t&&t.concurrentRequestLimit),this.Ba=new qe,this.S=t&&t.fastHandshake||!1,this.R=t&&t.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=t&&t.Pb||!1,t&&t.ua&&this.j.ua(),t&&t.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&t&&t.detectBufferingProxy||!1,this.ia=void 0,t&&t.longPollingTimeout&&t.longPollingTimeout>0&&(this.ia=t.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function dn(t){if(vn(t),3==t.I){var e=t.V++,n=Te(t.J);if(Ce(n,"SID",t.M),Ce(n,"RID",e),Ce(n,"TYPE","terminate"),Tn(t,n),(e=new Vt(t,t.j,e)).M=2,e.A=Ae(Te(n)),n=!1,v.navigator&&v.navigator.sendBeacon)try{n=v.navigator.sendBeacon(e.A.toString(),"")}catch(t){}!n&&v.Image&&((new Image).src=e.A,n=!0),n||(e.g=Dn(e.j,null),e.g.ea(e.A)),e.F=Date.now(),se(e)}xn(t)}function yn(t){t.g&&(Cn(t),t.g.cancel(),t.g=null)}function vn(t){yn(t),t.v&&(v.clearTimeout(t.v),t.v=null),On(t),t.h.cancel(),t.m&&("number"==typeof t.m&&v.clearTimeout(t.m),t.m=null)}function mn(t){if(!fe(t.h)&&!t.m){t.m=!0;var e=t.Ea;I||D(),x||(I(),x=!0),_.add(e,t),t.D=0}}function bn(t,e){return!(ge(t.h)>=t.h.j-(t.m?1:0))&&(t.m?(t.i=e.G.concat(t.i),!0):!(1==t.I||2==t.I||t.D>=(t.Sa?0:t.Ta))&&(t.m=Ht(w(t.Ea,t,e),Rn(t,t.D)),t.D++,!0))}function wn(t,e){var n;n=e?e.l:t.V++;const s=Te(t.J);Ce(s,"SID",t.M),Ce(s,"RID",n),Ce(s,"AID",t.K),Tn(t,s),t.u&&t.o&&en(s,t.u,t.o),n=new Vt(t,t.j,n,t.D+1),null===t.u&&(n.J=t.o),e&&(t.i=e.G.concat(t.i)),e=jn(t,n,1e3),n.H=Math.round(.5*t.va)+Math.round(.5*t.va*Math.random()),de(t.h,n),Qt(n,s,e)}function Tn(t,e){t.H&&Y(t.H,function(t,n){Ce(e,n,t)}),t.l&&Y({},function(t,n){Ce(e,n,t)})}function jn(t,e,n){n=Math.min(t.i.length,n);const s=t.l?w(t.l.Ka,t.l,t):null;t:{var o=t.i;let e=-1;for(;;){const t=["count="+n];-1==e?n>0?(e=o[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let a=!0;for(let l=0;l<n;l++){var r=o[l].g;const n=o[l].map;if((r-=e)<0)e=Math.max(0,o[l].g-100),a=!1;else try{r="req"+r+"_"||"";try{var h=n instanceof Map?n:Object.entries(n);for(const[e,n]of h){let s=n;m(n)&&(s=wt(n)),t.push(r+e+"="+encodeURIComponent(s))}}catch(e){throw t.push(r+"type="+encodeURIComponent("_badmap")),e}}catch(t){s&&s(n)}}if(a){h=t.join("&");break t}}h=void 0}return t=t.i.splice(0,n),e.G=t,h}function Sn(t){if(!t.g&&!t.v){t.Y=1;var e=t.Da;I||D(),x||(I(),x=!0),_.add(e,t),t.A=0}}function En(t){return!(t.g||t.v||t.A>=3)&&(t.Y++,t.v=Ht(w(t.Da,t),Rn(t,t.A)),t.A++,!0)}function Cn(t){null!=t.B&&(v.clearTimeout(t.B),t.B=null)}function An(t){t.g=new Vt(t,t.j,"rpc",t.Y),null===t.u&&(t.g.J=t.o),t.g.P=0;var e=Te(t.na);Ce(e,"RID","rpc"),Ce(e,"SID",t.M),Ce(e,"AID",t.K),Ce(e,"CI",t.F?"0":"1"),!t.F&&t.ia&&Ce(e,"TO",t.ia),Ce(e,"TYPE","xmlhttp"),Tn(t,e),t.u&&t.o&&en(e,t.u,t.o),t.O&&(t.g.H=t.O);var n=t.g;t=t.ba,n.M=1,n.A=Ae(Te(e)),n.u=null,n.R=!0,te(n,t)}function On(t){null!=t.C&&(v.clearTimeout(t.C),t.C=null)}function Pn(t,e){var n=null;if(t.g==e){On(t),Cn(t),t.g=null;var s=2}else{if(!pe(t.h,e))return;n=e.G,ye(t.h,e),s=1}if(0!=t.I)if(e.o)if(1==s){n=e.u?e.u.length:0,e=Date.now()-e.F;var o=t.D;ft(s=It(),new Lt(s,n)),mn(t)}else Sn(t);else if(3==(o=e.m)||0==o&&e.X>0||!(1==s&&bn(t,e)||2==s&&En(t)))switch(n&&n.length>0&&(e=t.h,e.i=e.i.concat(n)),o){case 1:In(t,5);break;case 4:In(t,10);break;case 3:In(t,6);break;default:In(t,2)}}function Rn(t,e){let n=t.Qa+Math.floor(Math.random()*t.Za);return t.isActive()||(n*=2),n*e}function In(t,e){if(t.j.info("Error code "+e),2==e){var n=w(t.bb,t),s=t.Ua;const e=!s;s=new we(s||"//www.google.com/images/cleardot.gif"),v.location&&"http"==v.location.protocol||je(s,"https"),Ae(s),e?Ge(s.toString(),n):Je(s.toString(),n)}else Mt(2);t.I=0,t.l&&t.l.pa(e),xn(t),vn(t)}function xn(t){if(t.I=0,t.ja=[],t.l){const e=ve(t.h);0==e.length&&0==t.i.length||(C(t.ja,e),C(t.ja,t.i),t.h.i.length=0,E(t.i),t.i.length=0),t.l.oa()}}function _n(t,e,n){var s=n instanceof we?Te(n):new we(n);if(""!=s.g)e&&(s.g=e+"."+s.g),Se(s,s.u);else{var o=v.location;s=o.protocol,e=e?e+"."+o.hostname:o.hostname,o=+o.port;const t=new we(null);s&&je(t,s),e&&(t.g=e),o&&Se(t,o),n&&(t.h=n),s=t}return n=t.G,e=t.wa,n&&e&&Ce(s,n,e),Ce(s,"VER",t.ka),Tn(t,s),s}function Dn(t,e,n){if(e&&!t.L)throw Error("Can't create secondary domain capable XhrIo object.");return(e=t.Aa&&!t.ma?new nn(new Ve({ab:n})):new nn(t.ma)).Fa(t.L),e}function Mn(){}function Ln(){}function Hn(t,e){ct.call(this),this.g=new pn(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.sa&&(t?t["X-WebChannel-Client-Profile"]=e.sa:t={"X-WebChannel-Client-Profile":e.sa}),this.g.U=t,(t=e&&e.Qb)&&!k(t)&&(this.g.u=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!k(e)&&(this.g.G=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Bn(this)}function Xn(t){At.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function kn(){Ot.call(this),this.status=1}function Bn(t){this.g=t}(f=nn.prototype).Fa=function(t){this.H=t},f.ea=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);e=e?e.toUpperCase():"GET",this.D=t,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ut.g(),this.g.onreadystatechange=S(w(this.Ca,this));try{this.B=!0,this.g.open(e,String(t),!0),this.B=!1}catch(t){return void rn(this,t)}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var o in s)n.set(o,s[o]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const t of s.keys())n.set(t,s.get(t))}s=Array.from(n.keys()).find(t=>"content-type"==t.toLowerCase()),o=v.FormData&&t instanceof v.FormData,!(Array.prototype.indexOf.call(on,e,void 0)>=0)||s||o||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[t,e]of n)this.g.setRequestHeader(t,e);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(t),this.v=!1}catch(t){rn(this,t)}},f.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=t||7,ft(this,"complete"),ft(this,"abort"),ln(this))},f.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ln(this,!0)),nn.Z.N.call(this)},f.Ca=function(){this.u||(this.B||this.v||this.j?an(this):this.Xa())},f.Xa=function(){an(this)},f.isActive=function(){return!!this.g},f.ca=function(){try{return un(this)>2?this.g.status:-1}catch(t){return-1}},f.la=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},f.La=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Tt(e)}},f.ya=function(){return this.o},f.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(f=pn.prototype).ka=8,f.I=1,f.connect=function(t,e,n,s){Mt(0),this.W=t,this.H=e||{},n&&void 0!==s&&(this.H.OSID=n,this.H.OAID=s),this.F=this.X,this.J=_n(this,null,this.W),mn(this)},f.Ea=function(t){if(this.m)if(this.m=null,1==this.I){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const o=new Vt(this,this.j,t);let r=this.o;if(this.U&&(r?(r=J(r),q(r,this.U)):r=this.U),null!==this.u||this.R||(o.J=r,r=null),this.S)t:{for(var e=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.map&&"string"==typeof(s=s.map.__data__)?s.length:void 0))break;if((e+=s)>4096){e=n;break t}if(4096===e||n===this.i.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=jn(this,o,e),Ce(n=Te(this.J),"RID",t),Ce(n,"CVER",22),this.G&&Ce(n,"X-HTTP-Session-Id",this.G),Tn(this,n),r&&(this.R?e="headers="+Wt(tn(r))+"&"+e:this.u&&en(n,this.u,r)),de(this.h,o),this.Ra&&Ce(n,"TYPE","init"),this.S?(Ce(n,"$req",e),Ce(n,"SID","null"),o.U=!0,Qt(o,n,null)):Qt(o,n,e),this.I=2}}else 3==this.I&&(t?wn(this,t):0==this.i.length||fe(this.h)||wn(this))},f.Da=function(){if(this.v=null,An(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var t=4*this.T;this.j.info("BP detection timer enabled: "+t),this.B=Ht(w(this.Wa,this),t)}},f.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Mt(10),yn(this),An(this))},f.Va=function(){null!=this.C&&(this.C=null,yn(this),En(this),Mt(19))},f.bb=function(t){t?(this.j.info("Successfully pinged google.com"),Mt(2)):(this.j.info("Failed to ping google.com"),Mt(1))},f.isActive=function(){return!!this.l&&this.l.isActive(this)},(f=Mn.prototype).ra=function(){},f.qa=function(){},f.pa=function(){},f.oa=function(){},f.isActive=function(){return!0},f.Ka=function(){},Ln.prototype.g=function(t,e){return new Hn(t,e)},j(Hn,ct),Hn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Hn.prototype.close=function(){dn(this.g)},Hn.prototype.o=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.v&&((n={}).__data__=wt(t),t=n);e.i.push(new ue(e.Ya++,t)),3==e.I&&mn(e)},Hn.prototype.N=function(){this.g.l=null,delete this.j,dn(this.g),delete this.g,Hn.Z.N.call(this)},j(Xn,At),j(kn,Ot),j(Bn,Mn),Bn.prototype.ra=function(){ft(this.g,"a")},Bn.prototype.qa=function(t){ft(this.g,new Xn(t))},Bn.prototype.pa=function(t){ft(this.g,new kn)},Bn.prototype.oa=function(){ft(this.g,"b")},Ln.prototype.createWebChannel=Ln.prototype.g,Hn.prototype.send=Hn.prototype.o,Hn.prototype.open=Hn.prototype.m,Hn.prototype.close=Hn.prototype.close,l=c.createWebChannelTransport=function(){return new Ln},a=c.getStatEventTarget=function(){return It()},h=c.Event=Pt,r=c.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Yt.NO_ERROR=0,Yt.TIMEOUT=8,Yt.HTTP_ERROR=6,o=c.ErrorCode=Yt,Gt.COMPLETE="complete",s=c.EventType=Gt,Et.EventType=Ct,Ct.OPEN="a",Ct.CLOSE="b",Ct.ERROR="c",Ct.MESSAGE="d",ct.prototype.listen=ct.prototype.J,n=c.WebChannel=Et,e=c.FetchXmlHttpFactory=Ve,nn.prototype.listenOnce=nn.prototype.K,nn.prototype.getLastError=nn.prototype.Ha,nn.prototype.getLastErrorCode=nn.prototype.ya,nn.prototype.getStatus=nn.prototype.ca,nn.prototype.getResponseJson=nn.prototype.La,nn.prototype.getResponseText=nn.prototype.la,nn.prototype.send=nn.prototype.ea,nn.prototype.setWithCredentials=nn.prototype.Fa,t=c.XhrIo=nn}).apply(void 0!==u?u:'undefined'!=typeof self?self:'undefined'!=typeof window?window:{})},1327,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"ActionCodeOperation",{enumerable:!0,get:function(){return t.A}}),Object.defineProperty(e,"ActionCodeURL",{enumerable:!0,get:function(){return t.aj}}),Object.defineProperty(e,"AuthCredential",{enumerable:!0,get:function(){return t.M}}),Object.defineProperty(e,"AuthErrorCodes",{enumerable:!0,get:function(){return t.J}}),Object.defineProperty(e,"EmailAuthCredential",{enumerable:!0,get:function(){return t.N}}),Object.defineProperty(e,"EmailAuthProvider",{enumerable:!0,get:function(){return t.W}}),Object.defineProperty(e,"FacebookAuthProvider",{enumerable:!0,get:function(){return t.X}}),Object.defineProperty(e,"FactorId",{enumerable:!0,get:function(){return t.F}}),Object.defineProperty(e,"GithubAuthProvider",{enumerable:!0,get:function(){return t.Z}}),Object.defineProperty(e,"GoogleAuthProvider",{enumerable:!0,get:function(){return t.Y}}),Object.defineProperty(e,"OAuthCredential",{enumerable:!0,get:function(){return t.Q}}),Object.defineProperty(e,"OAuthProvider",{enumerable:!0,get:function(){return t._}}),Object.defineProperty(e,"OperationType",{enumerable:!0,get:function(){return t.O}}),Object.defineProperty(e,"PhoneAuthCredential",{enumerable:!0,get:function(){return t.U}}),Object.defineProperty(e,"PhoneAuthProvider",{enumerable:!0,get:function(){return t.P}}),Object.defineProperty(e,"PhoneMultiFactorGenerator",{enumerable:!0,get:function(){return t.n}}),Object.defineProperty(e,"ProviderId",{enumerable:!0,get:function(){return t.q}}),Object.defineProperty(e,"RecaptchaVerifier",{enumerable:!0,get:function(){return t.R}}),Object.defineProperty(e,"SAMLAuthProvider",{enumerable:!0,get:function(){return t.$}}),Object.defineProperty(e,"SignInMethod",{enumerable:!0,get:function(){return t.S}}),Object.defineProperty(e,"TotpMultiFactorGenerator",{enumerable:!0,get:function(){return t.T}}),Object.defineProperty(e,"TotpSecret",{enumerable:!0,get:function(){return t.o}}),Object.defineProperty(e,"TwitterAuthProvider",{enumerable:!0,get:function(){return t.a0}}),Object.defineProperty(e,"applyActionCode",{enumerable:!0,get:function(){return t.a8}}),Object.defineProperty(e,"beforeAuthStateChanged",{enumerable:!0,get:function(){return t.y}}),Object.defineProperty(e,"browserCookiePersistence",{enumerable:!0,get:function(){return t.a}}),Object.defineProperty(e,"browserLocalPersistence",{enumerable:!0,get:function(){return t.b}}),Object.defineProperty(e,"browserPopupRedirectResolver",{enumerable:!0,get:function(){return t.m}}),Object.defineProperty(e,"browserSessionPersistence",{enumerable:!0,get:function(){return t.c}}),Object.defineProperty(e,"checkActionCode",{enumerable:!0,get:function(){return t.a9}}),Object.defineProperty(e,"confirmPasswordReset",{enumerable:!0,get:function(){return t.a7}}),Object.defineProperty(e,"connectAuthEmulator",{enumerable:!0,get:function(){return t.L}}),Object.defineProperty(e,"createUserWithEmailAndPassword",{enumerable:!0,get:function(){return t.ab}}),Object.defineProperty(e,"debugErrorMap",{enumerable:!0,get:function(){return t.H}}),Object.defineProperty(e,"deleteUser",{enumerable:!0,get:function(){return t.G}}),Object.defineProperty(e,"fetchSignInMethodsForEmail",{enumerable:!0,get:function(){return t.ag}}),Object.defineProperty(e,"getAdditionalUserInfo",{enumerable:!0,get:function(){return t.ar}}),Object.defineProperty(e,"getAuth",{enumerable:!0,get:function(){return t.p}}),Object.defineProperty(e,"getIdToken",{enumerable:!0,get:function(){return t.ao}}),Object.defineProperty(e,"getIdTokenResult",{enumerable:!0,get:function(){return t.ap}}),Object.defineProperty(e,"getMultiFactorResolver",{enumerable:!0,get:function(){return t.at}}),Object.defineProperty(e,"getRedirectResult",{enumerable:!0,get:function(){return t.k}}),Object.defineProperty(e,"inMemoryPersistence",{enumerable:!0,get:function(){return t.V}}),Object.defineProperty(e,"indexedDBLocalPersistence",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(e,"initializeAuth",{enumerable:!0,get:function(){return t.K}}),Object.defineProperty(e,"initializeRecaptchaConfig",{enumerable:!0,get:function(){return t.v}}),Object.defineProperty(e,"isSignInWithEmailLink",{enumerable:!0,get:function(){return t.ae}}),Object.defineProperty(e,"linkWithCredential",{enumerable:!0,get:function(){return t.a3}}),Object.defineProperty(e,"linkWithPhoneNumber",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(e,"linkWithPopup",{enumerable:!0,get:function(){return t.e}}),Object.defineProperty(e,"linkWithRedirect",{enumerable:!0,get:function(){return t.h}}),Object.defineProperty(e,"multiFactor",{enumerable:!0,get:function(){return t.au}}),Object.defineProperty(e,"onAuthStateChanged",{enumerable:!0,get:function(){return t.z}}),Object.defineProperty(e,"onIdTokenChanged",{enumerable:!0,get:function(){return t.x}}),Object.defineProperty(e,"parseActionCodeURL",{enumerable:!0,get:function(){return t.ak}}),Object.defineProperty(e,"prodErrorMap",{enumerable:!0,get:function(){return t.I}}),Object.defineProperty(e,"reauthenticateWithCredential",{enumerable:!0,get:function(){return t.a4}}),Object.defineProperty(e,"reauthenticateWithPhoneNumber",{enumerable:!0,get:function(){return t.r}}),Object.defineProperty(e,"reauthenticateWithPopup",{enumerable:!0,get:function(){return t.f}}),Object.defineProperty(e,"reauthenticateWithRedirect",{enumerable:!0,get:function(){return t.j}}),Object.defineProperty(e,"reload",{enumerable:!0,get:function(){return t.as}}),Object.defineProperty(e,"revokeAccessToken",{enumerable:!0,get:function(){return t.E}}),Object.defineProperty(e,"sendEmailVerification",{enumerable:!0,get:function(){return t.ah}}),Object.defineProperty(e,"sendPasswordResetEmail",{enumerable:!0,get:function(){return t.a6}}),Object.defineProperty(e,"sendSignInLinkToEmail",{enumerable:!0,get:function(){return t.ad}}),Object.defineProperty(e,"setPersistence",{enumerable:!0,get:function(){return t.t}}),Object.defineProperty(e,"signInAnonymously",{enumerable:!0,get:function(){return t.a1}}),Object.defineProperty(e,"signInWithCredential",{enumerable:!0,get:function(){return t.a2}}),Object.defineProperty(e,"signInWithCustomToken",{enumerable:!0,get:function(){return t.a5}}),Object.defineProperty(e,"signInWithEmailAndPassword",{enumerable:!0,get:function(){return t.ac}}),Object.defineProperty(e,"signInWithEmailLink",{enumerable:!0,get:function(){return t.af}}),Object.defineProperty(e,"signInWithPhoneNumber",{enumerable:!0,get:function(){return t.s}}),Object.defineProperty(e,"signInWithPopup",{enumerable:!0,get:function(){return t.d}}),Object.defineProperty(e,"signInWithRedirect",{enumerable:!0,get:function(){return t.g}}),Object.defineProperty(e,"signOut",{enumerable:!0,get:function(){return t.D}}),Object.defineProperty(e,"unlink",{enumerable:!0,get:function(){return t.aq}}),Object.defineProperty(e,"updateCurrentUser",{enumerable:!0,get:function(){return t.C}}),Object.defineProperty(e,"updateEmail",{enumerable:!0,get:function(){return t.am}}),Object.defineProperty(e,"updatePassword",{enumerable:!0,get:function(){return t.an}}),Object.defineProperty(e,"updatePhoneNumber",{enumerable:!0,get:function(){return t.u}}),Object.defineProperty(e,"updateProfile",{enumerable:!0,get:function(){return t.al}}),Object.defineProperty(e,"useDeviceLanguage",{enumerable:!0,get:function(){return t.B}}),Object.defineProperty(e,"validatePassword",{enumerable:!0,get:function(){return t.w}}),Object.defineProperty(e,"verifyBeforeUpdateEmail",{enumerable:!0,get:function(){return t.ai}}),Object.defineProperty(e,"verifyPasswordResetCode",{enumerable:!0,get:function(){return t.aa}});var t=r(d[0]);r(d[1]),r(d[2]),r(d[3]),r(d[4])},1328,[1329,1318,1320,1322,1319]);
__d(function(e,t,n,r,i,s,o){"use strict";Object.defineProperty(s,'__esModule',{value:!0}),Object.defineProperty(s,"$",{enumerable:!0,get:function(){return Yt}}),Object.defineProperty(s,"A",{enumerable:!0,get:function(){return m}}),Object.defineProperty(s,"B",{enumerable:!0,get:function(){return er}}),Object.defineProperty(s,"C",{enumerable:!0,get:function(){return tr}}),Object.defineProperty(s,"D",{enumerable:!0,get:function(){return nr}}),Object.defineProperty(s,"E",{enumerable:!0,get:function(){return rr}}),Object.defineProperty(s,"F",{enumerable:!0,get:function(){return l}}),Object.defineProperty(s,"G",{enumerable:!0,get:function(){return ir}}),Object.defineProperty(s,"H",{enumerable:!0,get:function(){return I}}),Object.defineProperty(s,"I",{enumerable:!0,get:function(){return _}}),Object.defineProperty(s,"J",{enumerable:!0,get:function(){return v}}),Object.defineProperty(s,"K",{enumerable:!0,get:function(){return ut}}),Object.defineProperty(s,"L",{enumerable:!0,get:function(){return lt}}),Object.defineProperty(s,"M",{enumerable:!0,get:function(){return gt}}),Object.defineProperty(s,"N",{enumerable:!0,get:function(){return Ot}}),Object.defineProperty(s,"O",{enumerable:!0,get:function(){return f}}),Object.defineProperty(s,"P",{enumerable:!0,get:function(){return ui}}),Object.defineProperty(s,"Q",{enumerable:!0,get:function(){return Nt}}),Object.defineProperty(s,"R",{enumerable:!0,get:function(){return ei}}),Object.defineProperty(s,"S",{enumerable:!0,get:function(){return p}}),Object.defineProperty(s,"T",{enumerable:!0,get:function(){return _s}}),Object.defineProperty(s,"U",{enumerable:!0,get:function(){return jt}}),Object.defineProperty(s,"V",{enumerable:!0,get:function(){return Se}}),Object.defineProperty(s,"W",{enumerable:!0,get:function(){return qt}}),Object.defineProperty(s,"X",{enumerable:!0,get:function(){return Kt}}),Object.defineProperty(s,"Y",{enumerable:!0,get:function(){return $t}}),Object.defineProperty(s,"Z",{enumerable:!0,get:function(){return Bt}}),Object.defineProperty(s,"_",{enumerable:!0,get:function(){return Gt}}),Object.defineProperty(s,"a",{enumerable:!0,get:function(){return Tr}}),Object.defineProperty(s,"a0",{enumerable:!0,get:function(){return Xt}}),Object.defineProperty(s,"a1",{enumerable:!0,get:function(){return tn}}),Object.defineProperty(s,"a2",{enumerable:!0,get:function(){return ln}}),Object.defineProperty(s,"a3",{enumerable:!0,get:function(){return hn}}),Object.defineProperty(s,"a4",{enumerable:!0,get:function(){return pn}}),Object.defineProperty(s,"a5",{enumerable:!0,get:function(){return mn}}),Object.defineProperty(s,"a6",{enumerable:!0,get:function(){return Tn}}),Object.defineProperty(s,"a7",{enumerable:!0,get:function(){return En}}),Object.defineProperty(s,"a8",{enumerable:!0,get:function(){return wn}}),Object.defineProperty(s,"a9",{enumerable:!0,get:function(){return bn}}),Object.defineProperty(s,"aA",{enumerable:!0,get:function(){return Wi}}),Object.defineProperty(s,"aB",{enumerable:!0,get:function(){return Ve}}),Object.defineProperty(s,"aC",{enumerable:!0,get:function(){return P}}),Object.defineProperty(s,"aD",{enumerable:!0,get:function(){return R}}),Object.defineProperty(s,"aE",{enumerable:!0,get:function(){return Vi}}),Object.defineProperty(s,"aF",{enumerable:!0,get:function(){return Pe}}),Object.defineProperty(s,"aG",{enumerable:!0,get:function(){return ke}}),Object.defineProperty(s,"aH",{enumerable:!0,get:function(){return ji}}),Object.defineProperty(s,"aI",{enumerable:!0,get:function(){return Si}}),Object.defineProperty(s,"aJ",{enumerable:!0,get:function(){return Ai}}),Object.defineProperty(s,"aK",{enumerable:!0,get:function(){return $e}}),Object.defineProperty(s,"aL",{enumerable:!0,get:function(){return we}}),Object.defineProperty(s,"aM",{enumerable:!0,get:function(){return Ke}}),Object.defineProperty(s,"aN",{enumerable:!0,get:function(){return qe}}),Object.defineProperty(s,"aO",{enumerable:!0,get:function(){return Ar}}),Object.defineProperty(s,"aP",{enumerable:!0,get:function(){return ss}}),Object.defineProperty(s,"aQ",{enumerable:!0,get:function(){return V}}),Object.defineProperty(s,"aR",{enumerable:!0,get:function(){return Jt}}),Object.defineProperty(s,"aa",{enumerable:!0,get:function(){return Pn}}),Object.defineProperty(s,"ab",{enumerable:!0,get:function(){return An}}),Object.defineProperty(s,"ac",{enumerable:!0,get:function(){return Sn}}),Object.defineProperty(s,"ad",{enumerable:!0,get:function(){return kn}}),Object.defineProperty(s,"ae",{enumerable:!0,get:function(){return On}}),Object.defineProperty(s,"af",{enumerable:!0,get:function(){return Rn}}),Object.defineProperty(s,"ag",{enumerable:!0,get:function(){return Cn}}),Object.defineProperty(s,"ah",{enumerable:!0,get:function(){return Dn}}),Object.defineProperty(s,"ai",{enumerable:!0,get:function(){return Ln}}),Object.defineProperty(s,"aj",{enumerable:!0,get:function(){return xt}}),Object.defineProperty(s,"ak",{enumerable:!0,get:function(){return Ht}}),Object.defineProperty(s,"al",{enumerable:!0,get:function(){return Un}}),Object.defineProperty(s,"am",{enumerable:!0,get:function(){return jn}}),Object.defineProperty(s,"an",{enumerable:!0,get:function(){return Fn}}),Object.defineProperty(s,"ao",{enumerable:!0,get:function(){return oe}}),Object.defineProperty(s,"ap",{enumerable:!0,get:function(){return ae}}),Object.defineProperty(s,"aq",{enumerable:!0,get:function(){return on}}),Object.defineProperty(s,"ar",{enumerable:!0,get:function(){return $n}}),Object.defineProperty(s,"as",{enumerable:!0,get:function(){return ge}}),Object.defineProperty(s,"at",{enumerable:!0,get:function(){return ar}}),Object.defineProperty(s,"au",{enumerable:!0,get:function(){return pr}}),Object.defineProperty(s,"av",{enumerable:!0,get:function(){return C}}),Object.defineProperty(s,"aw",{enumerable:!0,get:function(){return Fe}}),Object.defineProperty(s,"ax",{enumerable:!0,get:function(){return Me}}),Object.defineProperty(s,"ay",{enumerable:!0,get:function(){return b}}),Object.defineProperty(s,"az",{enumerable:!0,get:function(){return ls}}),Object.defineProperty(s,"b",{enumerable:!0,get:function(){return Ir}}),Object.defineProperty(s,"c",{enumerable:!0,get:function(){return wr}}),Object.defineProperty(s,"d",{enumerable:!0,get:function(){return Ii}}),Object.defineProperty(s,"e",{enumerable:!0,get:function(){return yi}}),Object.defineProperty(s,"f",{enumerable:!0,get:function(){return _i}}),Object.defineProperty(s,"g",{enumerable:!0,get:function(){return Ri}}),Object.defineProperty(s,"h",{enumerable:!0,get:function(){return Li}}),Object.defineProperty(s,"i",{enumerable:!0,get:function(){return Wr}}),Object.defineProperty(s,"j",{enumerable:!0,get:function(){return Ci}}),Object.defineProperty(s,"k",{enumerable:!0,get:function(){return Ui}}),Object.defineProperty(s,"l",{enumerable:!0,get:function(){return ii}}),Object.defineProperty(s,"m",{enumerable:!0,get:function(){return fs}}),Object.defineProperty(s,"n",{enumerable:!0,get:function(){return Is}}),Object.defineProperty(s,"o",{enumerable:!0,get:function(){return vs}}),Object.defineProperty(s,"p",{enumerable:!0,get:function(){return Os}}),Object.defineProperty(s,"q",{enumerable:!0,get:function(){return h}}),Object.defineProperty(s,"r",{enumerable:!0,get:function(){return si}}),Object.defineProperty(s,"s",{enumerable:!0,get:function(){return ri}}),Object.defineProperty(s,"t",{enumerable:!0,get:function(){return Bn}}),Object.defineProperty(s,"u",{enumerable:!0,get:function(){return ai}}),Object.defineProperty(s,"v",{enumerable:!0,get:function(){return Jn}}),Object.defineProperty(s,"w",{enumerable:!0,get:function(){return Yn}}),Object.defineProperty(s,"x",{enumerable:!0,get:function(){return Xn}}),Object.defineProperty(s,"y",{enumerable:!0,get:function(){return Qn}}),Object.defineProperty(s,"z",{enumerable:!0,get:function(){return Zn}});var a=t(o[0]),c=t(o[1]),u=t(o[2]),d=t(o[3]);
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const l={PHONE:'phone',TOTP:'totp'},h={FACEBOOK:'facebook.com',GITHUB:'github.com',GOOGLE:'google.com',PASSWORD:'password',PHONE:'phone',TWITTER:'twitter.com'},p={EMAIL_LINK:'emailLink',EMAIL_PASSWORD:'password',FACEBOOK:'facebook.com',GITHUB:'github.com',GOOGLE:'google.com',PHONE:'phone',TWITTER:'twitter.com'},f={LINK:'link',REAUTHENTICATE:'reauthenticate',SIGN_IN:'signIn'},m={EMAIL_SIGNIN:'EMAIL_SIGNIN',PASSWORD_RESET:'PASSWORD_RESET',RECOVER_EMAIL:'RECOVER_EMAIL',REVERT_SECOND_FACTOR_ADDITION:'REVERT_SECOND_FACTOR_ADDITION',VERIFY_AND_CHANGE_EMAIL:'VERIFY_AND_CHANGE_EMAIL',VERIFY_EMAIL:'VERIFY_EMAIL'};function g(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const I=
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function(){return{"admin-restricted-operation":'This operation is restricted to administrators only.',"argument-error":'',"app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":'Cordova framework is not ready.',"cors-unsupported":'This browser is not supported.',"credential-already-in-use":'This credential is already associated with a different user account.',"custom-token-mismatch":'The custom token corresponds to a different audience.',"requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":'Multi-factor users must always have a verified email.',"email-already-in-use":'The email address is already in use by another account.',"emulator-config-failed":"Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling \"connectAuthEmulator()\" sooner.","expired-action-code":'The action code has expired.',"cancelled-popup-request":'This operation has been cancelled due to another conflicting popup being opened.',"internal-error":'An internal AuthError has occurred.',"invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":'The mobile app identifier is not registered for the current project.',"invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":'An internal AuthError has occurred.',"invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":'The continue URL provided in the request is invalid.',"invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":'The custom token format is incorrect. Please check the documentation.',"invalid-dynamic-link-domain":'The provided dynamic link domain is not configured or authorized for the current project.',"invalid-email":'The email address is badly formatted.',"invalid-emulator-scheme":'Emulator URL must start with a valid scheme (http:// or https://).',"invalid-api-key":'Your API key is invalid, please check you have copied it correctly.',"invalid-cert-hash":'The SHA-1 certificate hash provided is invalid.',"invalid-credential":'The supplied auth credential is incorrect, malformed or has expired.',"invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":'The request does not contain a valid proof of first factor successful sign-in.',"invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":'The password is invalid or the user does not have a password.',"invalid-persistence-type":'The specified persistence type is invalid. It can only be local, session or none.',"invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":'The specified provider ID is invalid.',"invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":'The verification ID used to create the phone auth credential is invalid.',"invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":'Login blocked by user-provided method: {$originalMessage}',"missing-android-pkg-name":'An Android Package Name must be provided if the Android App is required to be installed.',"auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":'The phone auth credential was created with an empty SMS verification code.',"missing-continue-uri":'A continue URL must be provided in the request.',"missing-iframe-start":'An internal AuthError has occurred.',"missing-ios-bundle-id":'An iOS Bundle ID must be provided if an App Store ID is provided.',"missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":'A non-empty password must be provided',"missing-multi-factor-info":'No second factor identifier is provided.',"missing-multi-factor-session":'The request is missing proof of first factor successful sign-in.',"missing-phone-number":'To send verification codes, provide a phone number for the recipient.',"missing-verification-id":'The phone auth credential was created with an empty verification ID.',"app-deleted":'This instance of FirebaseApp has been deleted.',"multi-factor-info-not-found":'The user does not have a second factor matching the identifier provided.',"multi-factor-auth-required":'Proof of ownership of a second factor is required to complete sign-in.',"account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',"no-auth-event":'An internal AuthError has occurred.',"no-such-provider":'User was not linked to an account with the given provider.',"null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":"This operation is not supported in the environment this application is running on. \"location.protocol\" must be http, https or chrome-extension and web storage must be enabled.","popup-blocked":'Unable to establish a connection with the popup. It may have been blocked by the browser.',"popup-closed-by-user":'The popup has been closed by the user before finalizing the operation.',"provider-already-linked":'User can only be linked to one identity for the given provider.',"quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":'The redirect operation has been cancelled by the user before finalizing.',"redirect-operation-pending":'A redirect sign-in operation is already pending.',"rejected-credential":'The request contains malformed or mismatching credentials.',"second-factor-already-in-use":'The second factor is already enrolled on this account.',"maximum-second-factor-count-exceeded":'The maximum allowed number of second factors on a user has been exceeded.',"tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:'The operation has timed out.',"user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',"unsupported-persistence-type":'The current environment does not support the specified persistence type.',"unsupported-tenant-operation":'This operation is not supported in a multi-tenant context.',"unverified-email":'The operation requires a verified email.',"user-cancelled":'The user did not grant your application the permissions it requested.',"user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":'The user account has been disabled by an administrator.',"user-mismatch":'The supplied credentials do not correspond to the previously signed in user.',"user-signed-out":'',"weak-password":'The password must be 6 characters long or more.',"web-storage-unsupported":'This browser is not supported or 3rd party cookies and data may be disabled.',"already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":'The reCAPTCHA token is missing when sending request to the backend.',"invalid-recaptcha-token":'The reCAPTCHA token is invalid when sending request to the backend.',"invalid-recaptcha-action":'The reCAPTCHA action is invalid when sending request to the backend.',"recaptcha-not-enabled":'reCAPTCHA Enterprise integration is not enabled for this project.',"missing-client-type":'The reCAPTCHA client type is missing when sending request to the backend.',"missing-recaptcha-version":'The reCAPTCHA version is missing when sending request to the backend.',"invalid-req-type":'Invalid request parameters.',"invalid-recaptcha-version":'The reCAPTCHA version is invalid when sending request to the backend.',"unsupported-password-policy-schema-version":'The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.',"password-does-not-meet-requirements":'The password does not meet the requirements.',"invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}},_=g,y=new c.ErrorFactory('auth','Firebase',{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),v={ADMIN_ONLY_OPERATION:'auth/admin-restricted-operation',ARGUMENT_ERROR:'auth/argument-error',APP_NOT_AUTHORIZED:'auth/app-not-authorized',APP_NOT_INSTALLED:'auth/app-not-installed',CAPTCHA_CHECK_FAILED:'auth/captcha-check-failed',CODE_EXPIRED:'auth/code-expired',CORDOVA_NOT_READY:'auth/cordova-not-ready',CORS_UNSUPPORTED:'auth/cors-unsupported',CREDENTIAL_ALREADY_IN_USE:'auth/credential-already-in-use',CREDENTIAL_MISMATCH:'auth/custom-token-mismatch',CREDENTIAL_TOO_OLD_LOGIN_AGAIN:'auth/requires-recent-login',DEPENDENT_SDK_INIT_BEFORE_AUTH:'auth/dependent-sdk-initialized-before-auth',DYNAMIC_LINK_NOT_ACTIVATED:'auth/dynamic-link-not-activated',EMAIL_CHANGE_NEEDS_VERIFICATION:'auth/email-change-needs-verification',EMAIL_EXISTS:'auth/email-already-in-use',EMULATOR_CONFIG_FAILED:'auth/emulator-config-failed',EXPIRED_OOB_CODE:'auth/expired-action-code',EXPIRED_POPUP_REQUEST:'auth/cancelled-popup-request',INTERNAL_ERROR:'auth/internal-error',INVALID_API_KEY:'auth/invalid-api-key',INVALID_APP_CREDENTIAL:'auth/invalid-app-credential',INVALID_APP_ID:'auth/invalid-app-id',INVALID_AUTH:'auth/invalid-user-token',INVALID_AUTH_EVENT:'auth/invalid-auth-event',INVALID_CERT_HASH:'auth/invalid-cert-hash',INVALID_CODE:'auth/invalid-verification-code',INVALID_CONTINUE_URI:'auth/invalid-continue-uri',INVALID_CORDOVA_CONFIGURATION:'auth/invalid-cordova-configuration',INVALID_CUSTOM_TOKEN:'auth/invalid-custom-token',INVALID_DYNAMIC_LINK_DOMAIN:'auth/invalid-dynamic-link-domain',INVALID_EMAIL:'auth/invalid-email',INVALID_EMULATOR_SCHEME:'auth/invalid-emulator-scheme',INVALID_IDP_RESPONSE:'auth/invalid-credential',INVALID_LOGIN_CREDENTIALS:'auth/invalid-credential',INVALID_MESSAGE_PAYLOAD:'auth/invalid-message-payload',INVALID_MFA_SESSION:'auth/invalid-multi-factor-session',INVALID_OAUTH_CLIENT_ID:'auth/invalid-oauth-client-id',INVALID_OAUTH_PROVIDER:'auth/invalid-oauth-provider',INVALID_OOB_CODE:'auth/invalid-action-code',INVALID_ORIGIN:'auth/unauthorized-domain',INVALID_PASSWORD:'auth/wrong-password',INVALID_PERSISTENCE:'auth/invalid-persistence-type',INVALID_PHONE_NUMBER:'auth/invalid-phone-number',INVALID_PROVIDER_ID:'auth/invalid-provider-id',INVALID_RECIPIENT_EMAIL:'auth/invalid-recipient-email',INVALID_SENDER:'auth/invalid-sender',INVALID_SESSION_INFO:'auth/invalid-verification-id',INVALID_TENANT_ID:'auth/invalid-tenant-id',MFA_INFO_NOT_FOUND:'auth/multi-factor-info-not-found',MFA_REQUIRED:'auth/multi-factor-auth-required',MISSING_ANDROID_PACKAGE_NAME:'auth/missing-android-pkg-name',MISSING_APP_CREDENTIAL:'auth/missing-app-credential',MISSING_AUTH_DOMAIN:'auth/auth-domain-config-required',MISSING_CODE:'auth/missing-verification-code',MISSING_CONTINUE_URI:'auth/missing-continue-uri',MISSING_IFRAME_START:'auth/missing-iframe-start',MISSING_IOS_BUNDLE_ID:'auth/missing-ios-bundle-id',MISSING_OR_INVALID_NONCE:'auth/missing-or-invalid-nonce',MISSING_MFA_INFO:'auth/missing-multi-factor-info',MISSING_MFA_SESSION:'auth/missing-multi-factor-session',MISSING_PHONE_NUMBER:'auth/missing-phone-number',MISSING_PASSWORD:'auth/missing-password',MISSING_SESSION_INFO:'auth/missing-verification-id',MODULE_DESTROYED:'auth/app-deleted',NEED_CONFIRMATION:'auth/account-exists-with-different-credential',NETWORK_REQUEST_FAILED:'auth/network-request-failed',NULL_USER:'auth/null-user',NO_AUTH_EVENT:'auth/no-auth-event',NO_SUCH_PROVIDER:'auth/no-such-provider',OPERATION_NOT_ALLOWED:'auth/operation-not-allowed',OPERATION_NOT_SUPPORTED:'auth/operation-not-supported-in-this-environment',POPUP_BLOCKED:'auth/popup-blocked',POPUP_CLOSED_BY_USER:'auth/popup-closed-by-user',PROVIDER_ALREADY_LINKED:'auth/provider-already-linked',QUOTA_EXCEEDED:'auth/quota-exceeded',REDIRECT_CANCELLED_BY_USER:'auth/redirect-cancelled-by-user',REDIRECT_OPERATION_PENDING:'auth/redirect-operation-pending',REJECTED_CREDENTIAL:'auth/rejected-credential',SECOND_FACTOR_ALREADY_ENROLLED:'auth/second-factor-already-in-use',SECOND_FACTOR_LIMIT_EXCEEDED:'auth/maximum-second-factor-count-exceeded',TENANT_ID_MISMATCH:'auth/tenant-id-mismatch',TIMEOUT:'auth/timeout',TOKEN_EXPIRED:'auth/user-token-expired',TOO_MANY_ATTEMPTS_TRY_LATER:'auth/too-many-requests',UNAUTHORIZED_DOMAIN:'auth/unauthorized-continue-uri',UNSUPPORTED_FIRST_FACTOR:'auth/unsupported-first-factor',UNSUPPORTED_PERSISTENCE:'auth/unsupported-persistence-type',UNSUPPORTED_TENANT_OPERATION:'auth/unsupported-tenant-operation',UNVERIFIED_EMAIL:'auth/unverified-email',USER_CANCELLED:'auth/user-cancelled',USER_DELETED:'auth/user-not-found',USER_DISABLED:'auth/user-disabled',USER_MISMATCH:'auth/user-mismatch',USER_SIGNED_OUT:'auth/user-signed-out',WEAK_PASSWORD:'auth/weak-password',WEB_STORAGE_UNSUPPORTED:'auth/web-storage-unsupported',ALREADY_INITIALIZED:'auth/already-initialized',RECAPTCHA_NOT_ENABLED:'auth/recaptcha-not-enabled',MISSING_RECAPTCHA_TOKEN:'auth/missing-recaptcha-token',INVALID_RECAPTCHA_TOKEN:'auth/invalid-recaptcha-token',INVALID_RECAPTCHA_ACTION:'auth/invalid-recaptcha-action',MISSING_CLIENT_TYPE:'auth/missing-client-type',MISSING_RECAPTCHA_VERSION:'auth/missing-recaptcha-version',INVALID_RECAPTCHA_VERSION:'auth/invalid-recaptcha-version',INVALID_REQ_TYPE:'auth/invalid-req-type',INVALID_HOSTING_LINK_DOMAIN:'auth/invalid-hosting-link-domain'},T=new u.Logger('@firebase/auth');function E(e,...t){T.logLevel<=u.LogLevel.WARN&&T.warn(`Auth (${a.SDK_VERSION}): ${e}`,...t)}function w(e,...t){T.logLevel<=u.LogLevel.ERROR&&T.error(`Auth (${a.SDK_VERSION}): ${e}`,...t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function b(e,...t){throw O(e,...t)}function P(e,...t){return O(e,...t)}function A(e,t,n){const r={..._(),[t]:n};return new c.ErrorFactory('auth','Firebase',r).create(t,{appName:e.name})}function S(e){return A(e,"operation-not-supported-in-this-environment",'Operations that alter the current user are not supported in conjunction with FirebaseServerApp')}function k(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&b(e,"argument-error"),A(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function O(e,...t){if('string'!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return y.create(e,...t)}function R(e,t,...n){if(!e)throw O(t,...n)}function N(e){const t="INTERNAL ASSERTION FAILED: "+e;throw w(t),new Error(t)}function C(e,t){e||N(t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function D(){return'undefined'!=typeof self&&self.location?.href||''}function L(){return'http:'===M()||'https:'===M()}function M(){return'undefined'!=typeof self&&self.location?.protocol||null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function U(){if('undefined'==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class j{constructor(e,t){this.shortDelay=e,this.longDelay=t,C(t>e,'Short delay should be less than long delay!'),this.isMobile=(0,c.isMobileCordova)()||(0,c.isReactNative)()}get(){return'undefined'!=typeof navigator&&navigator&&'onLine'in navigator&&'boolean'==typeof navigator.onLine&&(L()||(0,c.isBrowserExtension)()||'connection'in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function F(e,t){C(e.emulator,'Emulator should always be set here');const{url:n}=e.emulator;return t?`${n}${t.startsWith('/')?t.slice(1):t}`:n}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class V{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:'undefined'!=typeof self&&'fetch'in self?self.fetch:'undefined'!=typeof globalThis&&globalThis.fetch?globalThis.fetch:'undefined'!=typeof fetch?fetch:void N('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill')}static headers(){return this.headersImpl?this.headersImpl:'undefined'!=typeof self&&'Headers'in self?self.Headers:'undefined'!=typeof globalThis&&globalThis.Headers?globalThis.Headers:'undefined'!=typeof Headers?Headers:void N('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill')}static response(){return this.responseImpl?this.responseImpl:'undefined'!=typeof self&&'Response'in self?self.Response:'undefined'!=typeof globalThis&&globalThis.Response?globalThis.Response:'undefined'!=typeof Response?Response:void N('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill')}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const x={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},H=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],q=new j(3e4,6e4);
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function W(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function z(e,t,n,r,i={}){return G(e,i,async()=>{let i={},s={};r&&("GET"===t?s=r:i={body:JSON.stringify(r)});const o=(0,c.querystring)({key:e.config.apiKey,...s}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]='application/json',e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const u={method:t,headers:a,...i};return(0,c.isCloudflareWorker)()||(u.referrerPolicy='no-referrer'),e.emulatorConfig&&(0,c.isCloudWorkstation)(e.emulatorConfig.host)&&(u.credentials='include'),V.fetch()(await $(e,e.config.apiHost,n,o),u)})}async function G(e,t,n){e._canInitEmulator=!1;const r={...x,...t};try{const t=new J(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await i.json();if('needConfirmation'in s)throw Y(e,"account-exists-with-different-credential",s);if(i.ok&&!('errorMessage'in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(' : ');if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Y(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw Y(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw Y(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,'-');if(o)throw A(e,a,o);b(e,a)}}catch(t){if(t instanceof c.FirebaseError)throw t;b(e,"network-request-failed",{message:String(t)})}}async function K(e,t,n,r,i={}){const s=await z(e,t,n,r,i);return'mfaPendingCredential'in s&&b(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function $(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?F(e.config,i):`${e.config.apiScheme}://${i}`;if(H.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){return s._getPersistence()._getFinalTarget(o).toString()}return o}function B(e){switch(e){case'ENFORCE':return"ENFORCE";case'AUDIT':return"AUDIT";case'OFF':return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class J{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(P(this.auth,"network-request-failed")),q.get())})}}function Y(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=P(e,t,r);return i.customData._tokenResponse=n,i}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function X(e){return void 0!==e&&void 0!==e.getResponse}function Q(e){return void 0!==e&&void 0!==e.enterprise}class Z{constructor(e){if(this.siteKey='',this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error('recaptchaKey undefined');this.siteKey=e.recaptchaKey.split('/')[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return B(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function ee(e){return(await z(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||''}async function te(e,t){return z(e,"GET","/v2/recaptchaConfig",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function ne(e,t){return z(e,"POST","/v1/accounts:delete",t)}async function re(e,t){return z(e,"POST","/v1/accounts:update",t)}async function ie(e,t){return z(e,"POST","/v1/accounts:lookup",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function se(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function oe(e,t=!1){return(0,c.getModularInstance)(e).getIdToken(t)}async function ae(e,t=!1){const n=(0,c.getModularInstance)(e),r=await n.getIdToken(t),i=ue(r);R(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s='object'==typeof i.firebase?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:se(ce(i.auth_time)),issuedAtTime:se(ce(i.iat)),expirationTime:se(ce(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function ce(e){return 1e3*Number(e)}function ue(e){const[t,n,r]=e.split('.');if(void 0===t||void 0===n||void 0===r)return w('JWT malformed, contained fewer than 3 sections'),null;try{const e=(0,c.base64Decode)(n);return e?JSON.parse(e):(w('Failed to decode base64 JWT payload'),null)}catch(e){return w('Caught error parsing JWT payload as JSON',e?.toString()),null}}function de(e){const t=ue(e);return R(t,"internal-error"),R(void 0!==t.exp,"internal-error"),R(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function le(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof c.FirebaseError&&he(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}function he({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class pe{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class fe{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=se(this.lastLoginAt),this.creationTime=se(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function me(e){const t=e.auth,n=await e.getIdToken(),r=await le(e,ie(t,{idToken:n}));R(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const s=i.providerUserInfo?.length?_e(i.providerUserInfo):[],o=Ie(e.providerData,s),a=e.isAnonymous,c=!(e.email&&i.passwordHash||o?.length),u=!!a&&c,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new fe(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,d)}async function ge(e){const t=(0,c.getModularInstance)(e);await me(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Ie(e,t){return[...e.filter(e=>!t.some(t=>t.providerId===e.providerId)),...t]}function _e(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||'',displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function ye(e,t){const n=await G(e,{},async()=>{const n=(0,c.querystring)({grant_type:'refresh_token',refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,s=await $(e,r,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();o["Content-Type"]='application/x-www-form-urlencoded';const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&(0,c.isCloudWorkstation)(e.emulatorConfig.host)&&(a.credentials='include'),V.fetch()(s,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ve(e,t){return z(e,"POST","/v2/accounts:revokeToken",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Te{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){R(e.idToken,"internal-error"),R(void 0!==e.idToken,"internal-error"),R(void 0!==e.refreshToken,"internal-error");const t='expiresIn'in e&&void 0!==e.expiresIn?Number(e.expiresIn):de(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){R(0!==e.length,"internal-error");const t=de(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(R(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await ye(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new Te;return n&&(R('string'==typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(R('string'==typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(R('number'==typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Te,this.toJSON())}_performRefresh(){return N('not implemented')}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ee(e,t){R('string'==typeof e||void 0===e,"internal-error",{appName:t})}class we{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new pe(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new fe(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await le(this,this.stsTokenManager.getToken(this.auth,e));return R(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ae(this,e)}reload(){return ge(this)}_assign(e){this!==e&&(R(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new we({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){R(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await me(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,a._isFirebaseServerApp)(this.auth.app))return Promise.reject(S(this.auth));const e=await this.getIdToken();return await le(this,ne(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||''}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:l,isAnonymous:h,providerData:p,stsTokenManager:f}=t;R(d&&f,e,"internal-error");const m=Te.fromJSON(this.name,f);R('string'==typeof d,e,"internal-error"),Ee(n,e.name),Ee(r,e.name),R('boolean'==typeof l,e,"internal-error"),R('boolean'==typeof h,e,"internal-error"),Ee(i,e.name),Ee(s,e.name),Ee(o,e.name),Ee(a,e.name),Ee(c,e.name),Ee(u,e.name);const g=new we({uid:d,auth:e,email:r,emailVerified:l,displayName:n,isAnonymous:h,photoURL:s,phoneNumber:i,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:u});return p&&Array.isArray(p)&&(g.providerData=p.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new Te;r.updateFromServerResponse(t);const i=new we({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await me(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];R(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?_e(r.providerUserInfo):[],s=!(r.email&&r.passwordHash||i?.length),o=new Te;o.updateFromIdToken(n);const a=new we({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new fe(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||i?.length)};return Object.assign(a,c),a}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const be=new Map;function Pe(e){C(e instanceof Function,'Expected a class definition');let t=be.get(e);return t?(C(t instanceof e,'Instance stored in cache mismatched with class'),t):(t=new e,be.set(e,t),t)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ae{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ae.type='NONE';const Se=Ae;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ke(e,t,n){return`firebase:${e}:${t}:${n}`}class Oe{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=ke(this.userKey,r.apiKey,i),this.fullPersistenceKey=ke("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if('string'==typeof e){const t=await ie(this.auth,{idToken:e}).catch(()=>{});return t?we._fromGetAccountInfoResponse(this.auth,t,e):null}return we._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Oe(Pe(Se),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let i=r[0]||Pe(Se);const s=ke(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=await n._get(s);if(t){let r;if('string'==typeof t){const n=await ie(e,{idToken:t}).catch(()=>{});if(!n)break;r=await we._fromGetAccountInfoResponse(e,n,t)}else r=we._fromJSON(e,t);n!==i&&(o=r),i=n;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(s)}catch{}})),new Oe(i,e,n)):new Oe(i,e,n)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Re(e){const t=e.toLowerCase();if(t.includes('opera/')||t.includes('opr/')||t.includes('opios/'))return"Opera";if(Le(t))return"IEMobile";if(t.includes('msie')||t.includes('trident/'))return"IE";if(t.includes('edge/'))return"Edge";if(Ne(t))return"Firefox";if(t.includes('silk/'))return"Silk";if(Ue(t))return"Blackberry";if(je(t))return"Webos";if(Ce(t))return"Safari";if((t.includes('chrome/')||De(t))&&!t.includes('edge/'))return"Chrome";if(Me(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function Ne(e=(0,c.getUA)()){return/firefox\//i.test(e)}function Ce(e=(0,c.getUA)()){const t=e.toLowerCase();return t.includes('safari/')&&!t.includes('chrome/')&&!t.includes('crios/')&&!t.includes('android')}function De(e=(0,c.getUA)()){return/crios\//i.test(e)}function Le(e=(0,c.getUA)()){return/iemobile/i.test(e)}function Me(e=(0,c.getUA)()){return/android/i.test(e)}function Ue(e=(0,c.getUA)()){return/blackberry/i.test(e)}function je(e=(0,c.getUA)()){return/webos/i.test(e)}function Fe(e=(0,c.getUA)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ve(e=(0,c.getUA)()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(e)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(e)}function xe(e=(0,c.getUA)()){return Fe(e)&&!!window.navigator?.standalone}function He(e=(0,c.getUA)()){return Fe(e)||Me(e)||je(e)||Ue(e)||/windows phone/i.test(e)||Le(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function qe(e,t=[]){let n;switch(e){case"Browser":n=Re((0,c.getUA)());break;case"Worker":n=`${Re((0,c.getUA)())}-${e}`;break;default:n=e}const r=t.length?t.join(','):'FirebaseCore-web';return`${n}/JsCore/${a.SDK_VERSION}/${r}`}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class We{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(const e of t)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:e?.message})}}}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function ze(e,t={}){return z(e,"GET","/v2/passwordPolicy",W(e,t))}
/**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ge{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??6,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,'ENFORCEMENT_STATE_UNSPECIFIED'===this.enforcementState&&(this.enforcementState='OFF'),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join('')??'',this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>='a'&&n<='z',n>='A'&&n<='Z',n>='0'&&n<='9',this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ke{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Be(this),this.idTokenSubscription=new Be(this),this.beforeStateQueue=new We(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=y,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Pe(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Oe.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await ie(this,{idToken:e}),n=await we._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn('FirebaseServerApp could not login user with provided authIdToken: ',e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,a._isFirebaseServerApp)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==i||!s?.user||(n=s.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return R(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await me(e)}catch(e){if("auth/network-request-failed"!==e?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=U()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,a._isFirebaseServerApp)(this.app))return Promise.reject(S(this));const t=e?(0,c.getModularInstance)(e):null;return t&&R(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&R(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,a._isFirebaseServerApp)(this.app)?Promise.reject(S(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,a._isFirebaseServerApp)(this.app)?Promise.reject(S(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pe(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ze(this),t=new Ge(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new c.ErrorFactory('auth','Firebase',e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:'apple.com',tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await ve(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Pe(e)||this._popupRedirectResolver;R(t,this,"argument-error"),this.redirectPersistenceManager=await Oe.create(this,[Pe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i='function'==typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(R(o,this,"internal-error"),o.then(()=>{s||i(this.currentUser)}),'function'==typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return R(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qe(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,a._isFirebaseServerApp)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&E(`Error while retrieving App Check token: ${e.error}`),e?.token}}function $e(e){return(0,c.getModularInstance)(e)}class Be{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,c.createSubscribe)(e=>this.observer=e)}get next(){return R(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */let Je={async loadJS(){throw new Error('Unable to load external scripts')},recaptchaV2Script:'',recaptchaEnterpriseScript:'',gapiScript:''};function Ye(e){return Je.loadJS(e)}function Xe(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Qe=1e12;class Ze{constructor(e){this.auth=e,this.counter=Qe,this._widgets=new Map}render(e,t){const n=this.counter;return this._widgets.set(n,new nt(e,this.auth.name,t||{})),this.counter++,n}reset(e){const t=e||Qe;this._widgets.get(t)?.delete(),this._widgets.delete(t)}getResponse(e){const t=e||Qe;return this._widgets.get(t)?.getResponse()||''}async execute(e){const t=e||Qe;return this._widgets.get(t)?.execute(),''}}class et{constructor(){this.enterprise=new tt}ready(e){e()}execute(e,t){return Promise.resolve('token')}render(e,t){return''}}class tt{ready(e){e()}execute(e,t){return Promise.resolve('token')}render(e,t){return''}}class nt{constructor(e,t,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const r='string'==typeof e?document.getElementById(e):e;R(r,"argument-error",{appName:t}),this.container=r,this.isVisible='invisible'!==this.params.size,this.isVisible?this.execute():this.container.addEventListener('click',this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener('click',this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=rt(50);const{callback:e,'expired-callback':t}=this.params;if(e)try{e(this.responseToken)}catch(e){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(e){}this.isVisible&&this.execute()},6e4)},500))}checkIfDeleted(){if(this.deleted)throw new Error('reCAPTCHA mock was already deleted!')}}function rt(e){const t=[],n='1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';for(let r=0;r<e;r++)t.push(n.charAt(Math.floor(62*Math.random())));return t.join('')}const it='NO_RECAPTCHA';class st{constructor(e){this.type="recaptcha-enterprise",this.auth=$e(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{te(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new Z(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error('recaptcha Enterprise site key undefined'))}).catch(e=>{n(e)})})}function r(t,n,r){const i=window.grecaptcha;Q(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(it)})}):r(Error('No reCAPTCHA enterprise script loaded.'))}if(this.auth.settings.appVerificationDisabledForTesting){return(new et).execute('siteKey',{action:'verify'})}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&Q(window.grecaptcha))r(n,e,i);else{if('undefined'==typeof window)return void i(new Error('RecaptchaVerifier is only supported in browser'));let t=Je.recaptchaEnterpriseScript;0!==t.length&&(t+=n),Ye(t).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function ot(e,t,n,r=!1,i=!1){const s=new st(e);let o;if(i)o=it;else try{o=await s.verify(n)}catch(e){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if('phoneEnrollmentInfo'in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if('phoneSignInInfo'in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function at(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await ot(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await ot(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)})}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await ot(e,t,n);return r(e,i).catch(async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await ot(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)})}{const i=await ot(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+' provider is not supported.')}async function ct(e){const t=$e(e),n=await te(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Z(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){new st(t).verify()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ut(e,t){const n=(0,a._getProvider)(e,'auth');if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,c.deepEqual)(r,t??{}))return e;b(e,"already-initialized")}return n.initialize({options:t})}function dt(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Pe);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function lt(e,t,n){const r=$e(e);R(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!!n?.disableWarnings,s=ht(t),{host:o,port:a}=pt(t),u=null===a?'':`:${a}`,d={url:`${s}//${o}${u}/`},l=Object.freeze({host:o,port:a,protocol:s.replace(':',''),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator)return R(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void R((0,c.deepEqual)(d,r.config.emulator)&&(0,c.deepEqual)(l,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=d,r.emulatorConfig=l,r.settings.appVerificationDisabledForTesting=!0,(0,c.isCloudWorkstation)(o)?((0,c.pingServer)(`${s}//${o}${u}`),(0,c.updateEmulatorBanner)('Auth',!0)):i||mt()}function ht(e){const t=e.indexOf(':');return t<0?'':e.substr(0,t+1)}function pt(e){const t=ht(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:'',port:null};const r=n[2].split('@').pop()||'',i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:ft(r.substr(e.length+1))}}{const[e,t]=r.split(':');return{host:e,port:ft(t)}}}function ft(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function mt(){function e(){const e=document.createElement('p'),t=e.style;e.innerText='Running in emulator mode. Do not use with production credentials.',t.position='fixed',t.width='100%',t.backgroundColor='#ffffff',t.border='.1em solid #000000',t.color='#b50000',t.bottom='0px',t.left='0px',t.margin='0px',t.zIndex='10000',t.textAlign='center',e.classList.add('firebase-emulator-warning'),document.body.appendChild(e)}'undefined'!=typeof console&&'function'==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),'undefined'!=typeof window&&'undefined'!=typeof document&&('loading'===document.readyState?window.addEventListener('DOMContentLoaded',e):e())}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class gt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return N('not implemented')}_getIdTokenResponse(e){return N('not implemented')}_linkToIdToken(e,t){return N('not implemented')}_getReauthenticationResolver(e){return N('not implemented')}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function It(e,t){return z(e,"POST","/v1/accounts:resetPassword",W(e,t))}async function _t(e,t){return z(e,"POST","/v1/accounts:update",t)}async function yt(e,t){return z(e,"POST","/v1/accounts:signUp",t)}async function vt(e,t){return z(e,"POST","/v1/accounts:update",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Tt(e,t){return K(e,"POST","/v1/accounts:signInWithPassword",W(e,t))}async function Et(e,t){return z(e,"POST","/v1/accounts:sendOobCode",W(e,t))}async function wt(e,t){return Et(e,t)}async function bt(e,t){return Et(e,t)}async function Pt(e,t){return Et(e,t)}async function At(e,t){return Et(e,t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function St(e,t){return K(e,"POST","/v1/accounts:signInWithEmailLink",W(e,t))}async function kt(e,t){return K(e,"POST","/v1/accounts:signInWithEmailLink",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ot extends gt{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Ot(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Ot(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t='string'==typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return at(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Tt,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return St(e,{email:this._email,oobCode:this._password});default:b(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return at(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",yt,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return kt(e,{idToken:t,email:this._email,oobCode:this._password});default:b(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Rt(e,t){return K(e,"POST","/v1/accounts:signInWithIdp",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Nt extends gt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Nt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):b("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t='string'==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const s=new Nt(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){return Rt(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Rt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Rt(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,c.querystring)(t)}return e}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Ct(e,t){return z(e,"POST","/v1/accounts:sendVerificationCode",W(e,t))}async function Dt(e,t){return K(e,"POST","/v1/accounts:signInWithPhoneNumber",W(e,t))}async function Lt(e,t){const n=await K(e,"POST","/v1/accounts:signInWithPhoneNumber",W(e,t));if(n.temporaryProof)throw Y(e,"account-exists-with-different-credential",n);return n}const Mt={USER_NOT_FOUND:"user-not-found"};async function Ut(e,t){return K(e,"POST","/v1/accounts:signInWithPhoneNumber",W(e,{...t,operation:'REAUTH'}),Mt)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class jt extends gt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new jt({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new jt({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Dt(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Lt(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Ut(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){'string'==typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new jt({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ft(e){switch(e){case'recoverEmail':return"RECOVER_EMAIL";case'resetPassword':return"PASSWORD_RESET";case'signIn':return"EMAIL_SIGNIN";case'verifyEmail':return"VERIFY_EMAIL";case'verifyAndChangeEmail':return"VERIFY_AND_CHANGE_EMAIL";case'revertSecondFactorAddition':return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vt(e){const t=(0,c.querystringDecode)((0,c.extractQuerystring)(e)).link,n=t?(0,c.querystringDecode)((0,c.extractQuerystring)(t)).deep_link_id:null,r=(0,c.querystringDecode)((0,c.extractQuerystring)(e)).deep_link_id;return(r?(0,c.querystringDecode)((0,c.extractQuerystring)(r)).link:null)||r||n||t||e}class xt{constructor(e){const t=(0,c.querystringDecode)((0,c.extractQuerystring)(e)),n=t.apiKey??null,r=t.oobCode??null,i=Ft(t.mode??null);R(n&&r&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Vt(e);try{return new xt(t)}catch{return null}}}function Ht(e){return xt.parseLink(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class qt{constructor(){this.providerId=qt.PROVIDER_ID}static credential(e,t){return Ot._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=xt.parseLink(t);return R(n,"argument-error"),Ot._fromEmailAndCode(e,n.code,n.tenantId)}}qt.PROVIDER_ID="password",qt.EMAIL_PASSWORD_SIGN_IN_METHOD="password",qt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Wt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class zt extends Wt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Gt extends zt{static credentialFromJSON(e){const t='string'==typeof e?JSON.parse(e):e;return R('providerId'in t&&'signInMethod'in t,"argument-error"),Nt._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return R(e.idToken||e.accessToken,"argument-error"),Nt._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return Gt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Gt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:r,pendingToken:i,nonce:s,providerId:o}=e;if(!(n||r||t||i))return null;if(!o)return null;try{return new Gt(o)._credential({idToken:t,accessToken:n,nonce:s,pendingToken:i})}catch(e){return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Kt extends zt{constructor(){super("facebook.com")}static credential(e){return Nt._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!('oauthAccessToken'in e))return null;if(!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.FACEBOOK_SIGN_IN_METHOD="facebook.com",Kt.PROVIDER_ID="facebook.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class $t extends zt{constructor(){super("google.com"),this.addScope('profile')}static credential(e,t){return Nt._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return $t.credential(t,n)}catch{return null}}}$t.GOOGLE_SIGN_IN_METHOD="google.com",$t.PROVIDER_ID="google.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Bt extends zt{constructor(){super("github.com")}static credential(e){return Nt._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!('oauthAccessToken'in e))return null;if(!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.GITHUB_SIGN_IN_METHOD="github.com",Bt.PROVIDER_ID="github.com";class Jt extends gt{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){return Rt(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Rt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Rt(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t='string'==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,pendingToken:i}=t;return n&&r&&i&&n===r?new Jt(n,i):null}static _create(e,t){return new Jt(e,t)}buildRequest(){return{requestUri:"http://localhost",returnSecureToken:!0,pendingToken:this.pendingToken}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Yt extends Wt{constructor(e){R(e.startsWith("saml."),"argument-error"),super(e)}static credentialFromResult(e){return Yt.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Yt.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=Jt.fromJSON(e);return R(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:n}=e;if(!t||!n)return null;try{return Jt._create(n,t)}catch(e){return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Xt extends zt{constructor(){super("twitter.com")}static credential(e,t){return Nt._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Xt.credential(t,n)}catch{return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
async function Qt(e,t){return K(e,"POST","/v1/accounts:signUp",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */Xt.TWITTER_SIGN_IN_METHOD="twitter.com",Xt.PROVIDER_ID="twitter.com";class Zt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await we._fromIdTokenResponse(e,n,r),s=en(n);return new Zt({user:i,providerId:s,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=en(n);return new Zt({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function en(e){return e.providerId?e.providerId:'phoneNumber'in e?"phone":null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function tn(e){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const t=$e(e);if(await t._initializationPromise,t.currentUser?.isAnonymous)return new Zt({user:t.currentUser,providerId:null,operationType:"signIn"});const n=await Qt(t,{returnSecureToken:!0}),r=await Zt._fromIdTokenResponse(t,"signIn",n,!0);return await t._updateCurrentUser(r.user),r}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class nn extends c.FirebaseError{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,nn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new nn(e,t,n,r)}}function rn(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw nn._fromErrorAndOperation(e,n,t,r);throw n})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function sn(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function on(e,t){const n=(0,c.getModularInstance)(e);await cn(!0,n,t);const{providerUserInfo:r}=await re(n.auth,{idToken:await n.getIdToken(),deleteProvider:[t]}),i=sn(r||[]);return n.providerData=n.providerData.filter(e=>i.has(e.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function an(e,t,n=!1){const r=await le(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Zt._forOperation(e,"link",r)}async function cn(e,t,n){await me(t);const r=!1===e?"provider-already-linked":"no-such-provider";R(sn(t.providerData).has(n)===e,t.auth,r)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function un(e,t,n=!1){const{auth:r}=e;if((0,a._isFirebaseServerApp)(r.app))return Promise.reject(S(r));const i="reauthenticate";try{const s=await le(e,rn(r,i,t,e),n);R(s.idToken,r,"internal-error");const o=ue(s.idToken);R(o,r,"internal-error");const{sub:a}=o;return R(e.uid===a,r,"user-mismatch"),Zt._forOperation(e,i,s)}catch(e){throw"auth/user-not-found"===e?.code&&b(r,"user-mismatch"),e}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function dn(e,t,n=!1){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const r="signIn",i=await rn(e,r,t),s=await Zt._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}async function ln(e,t){return dn($e(e),t)}async function hn(e,t){const n=(0,c.getModularInstance)(e);return await cn(!1,n,t.providerId),an(n,t)}async function pn(e,t){return un((0,c.getModularInstance)(e),t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function fn(e,t){return K(e,"POST","/v1/accounts:signInWithCustomToken",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function mn(e,t){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const n=$e(e),r=await fn(n,{token:t,returnSecureToken:!0}),i=await Zt._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(i.user),i}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class gn{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return'phoneInfo'in t?In._fromServerResponse(e,t):'totpInfo'in t?_n._fromServerResponse(e,t):b(e,"internal-error")}}class In extends gn{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new In(t)}}class _n extends gn{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new _n(t)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function yn(e,t,n){R(n.url?.length>0,e,"invalid-continue-uri"),R(void 0===n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),R(void 0===n.linkDomain||n.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.linkDomain=n.linkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(R(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(R(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function vn(e){const t=$e(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Tn(e,t,n){const r=$e(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};n&&yn(r,i,n),await at(r,i,"getOobCode",bt,"EMAIL_PASSWORD_PROVIDER")}async function En(e,t,n){await It((0,c.getModularInstance)(e),{oobCode:t,newPassword:n}).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&vn(e),t})}async function wn(e,t){await vt((0,c.getModularInstance)(e),{oobCode:t})}async function bn(e,t){const n=(0,c.getModularInstance)(e),r=await It(n,{oobCode:t}),i=r.requestType;switch(R(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":R(r.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":R(r.mfaInfo,n,"internal-error");default:R(r.email,n,"internal-error")}let s=null;return r.mfaInfo&&(s=gn._fromServerResponse($e(n),r.mfaInfo)),{data:{email:("VERIFY_AND_CHANGE_EMAIL"===r.requestType?r.newEmail:r.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===r.requestType?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function Pn(e,t){const{data:n}=await bn((0,c.getModularInstance)(e),t);return n.email}async function An(e,t,n){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const r=$e(e),i=at(r,{returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Qt,"EMAIL_PASSWORD_PROVIDER"),s=await i.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&vn(e),t}),o=await Zt._fromIdTokenResponse(r,"signIn",s);return await r._updateCurrentUser(o.user),o}function Sn(e,t,n){return(0,a._isFirebaseServerApp)(e.app)?Promise.reject(S(e)):ln((0,c.getModularInstance)(e),qt.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&vn(e),t})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function kn(e,t,n){const r=$e(e),i={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};!(function(e,t){R(t.handleCodeInApp,r,"argument-error"),t&&yn(r,e,t)})(i,n),await at(r,i,"getOobCode",Pt,"EMAIL_PASSWORD_PROVIDER")}function On(e,t){const n=xt.parseLink(t);return"EMAIL_SIGNIN"===n?.operation}async function Rn(e,t,n){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const r=(0,c.getModularInstance)(e),i=qt.credentialWithLink(t,n||D());return R(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),ln(r,i)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Nn(e,t){return z(e,"POST","/v1/accounts:createAuthUri",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Cn(e,t){const n={identifier:t,continueUri:L()?D():'http://localhost'},{signinMethods:r}=await Nn((0,c.getModularInstance)(e),n);return r||[]}async function Dn(e,t){const n=(0,c.getModularInstance)(e),r={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()};t&&yn(n.auth,r,t);const{email:i}=await wt(n.auth,r);i!==e.email&&await e.reload()}async function Ln(e,t,n){const r=(0,c.getModularInstance)(e),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await e.getIdToken(),newEmail:t};n&&yn(r.auth,i,n);const{email:s}=await At(r.auth,i);s!==e.email&&await e.reload()}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Mn(e,t){return z(e,"POST","/v1/accounts:update",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Un(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const r=(0,c.getModularInstance)(e),i={idToken:await r.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},s=await le(r,Mn(r.auth,i));r.displayName=s.displayName||null,r.photoURL=s.photoUrl||null;const o=r.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=r.displayName,o.photoURL=r.photoURL),await r._updateTokensIfNecessary(s)}function jn(e,t){const n=(0,c.getModularInstance)(e);return(0,a._isFirebaseServerApp)(n.auth.app)?Promise.reject(S(n.auth)):Vn(n,t,null)}function Fn(e,t){return Vn((0,c.getModularInstance)(e),null,t)}async function Vn(e,t,n){const{auth:r}=e,i={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(i.email=t),n&&(i.password=n);const s=await le(e,_t(r,i));await e._updateTokensIfNecessary(s,!0)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function xn(e){if(!e)return null;const{providerId:t}=e,n=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},r=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!t&&e?.idToken){const t=ue(e.idToken)?.firebase?.sign_in_provider;if(t){return new Hn(r,"anonymous"!==t&&"custom"!==t?t:null)}}if(!t)return null;switch(t){case"facebook.com":return new Wn(r,n);case"github.com":return new zn(r,n);case"google.com":return new Gn(r,n);case"twitter.com":return new Kn(r,n,e.screenName||null);case"custom":case"anonymous":return new Hn(r,null);default:return new Hn(r,t,n)}}class Hn{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class qn extends Hn{constructor(e,t,n,r){super(e,t,n),this.username=r}}class Wn extends Hn{constructor(e,t){super(e,"facebook.com",t)}}class zn extends qn{constructor(e,t){super(e,"github.com",t,'string'==typeof t?.login?t?.login:null)}}class Gn extends Hn{constructor(e,t){super(e,"google.com",t)}}class Kn extends qn{constructor(e,t,n){super(e,"twitter.com",t,n)}}function $n(e){const{user:t,_tokenResponse:n}=e;return t.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:xn(n)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Bn(e,t){return(0,c.getModularInstance)(e).setPersistence(t)}function Jn(e){return ct(e)}async function Yn(e,t){return $e(e).validatePassword(t)}function Xn(e,t,n,r){return(0,c.getModularInstance)(e).onIdTokenChanged(t,n,r)}function Qn(e,t,n){return(0,c.getModularInstance)(e).beforeAuthStateChanged(t,n)}function Zn(e,t,n,r){return(0,c.getModularInstance)(e).onAuthStateChanged(t,n,r)}function er(e){(0,c.getModularInstance)(e).useDeviceLanguage()}function tr(e,t){return(0,c.getModularInstance)(e).updateCurrentUser(t)}function nr(e){return(0,c.getModularInstance)(e).signOut()}function rr(e,t){return $e(e).revokeAccessToken(t)}async function ir(e){return(0,c.getModularInstance)(e).delete()}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class sr{constructor(e,t,n){this.type=e,this.credential=t,this.user=n}static _fromIdtoken(e,t){return new sr("enroll",e,t)}static _fromMfaPendingCredential(e){return new sr("signin",e)}toJSON(){const e="enroll"===this.type?'idToken':'pendingCredential';return{multiFactorSession:{[e]:this.credential}}}static fromJSON(e){if(e?.multiFactorSession){if(e.multiFactorSession?.pendingCredential)return sr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(e.multiFactorSession?.idToken)return sr._fromIdtoken(e.multiFactorSession.idToken)}return null}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class or{constructor(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}static _fromError(e,t){const n=$e(e),r=t.customData._serverResponse,i=(r.mfaInfo||[]).map(e=>gn._fromServerResponse(n,e));R(r.mfaPendingCredential,n,"internal-error");const s=sr._fromMfaPendingCredential(r.mfaPendingCredential);return new or(s,i,async e=>{const i=await e._process(n,s);delete r.mfaInfo,delete r.mfaPendingCredential;const o={...r,idToken:i.idToken,refreshToken:i.refreshToken};switch(t.operationType){case"signIn":const e=await Zt._fromIdTokenResponse(n,t.operationType,o);return await n._updateCurrentUser(e.user),e;case"reauthenticate":return R(t.user,n,"internal-error"),Zt._forOperation(t.user,t.operationType,o);default:b(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function ar(e,t){const n=(0,c.getModularInstance)(e),r=t;return R(t.customData.operationType,n,"argument-error"),R(r.customData._serverResponse?.mfaPendingCredential,n,"argument-error"),or._fromError(n,r)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function cr(e,t){return z(e,"POST","/v2/accounts/mfaEnrollment:start",W(e,t))}function ur(e,t){return z(e,"POST","/v2/accounts/mfaEnrollment:finalize",W(e,t))}function dr(e,t){return z(e,"POST","/v2/accounts/mfaEnrollment:finalize",W(e,t))}class lr{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(t=>gn._fromServerResponse(e.auth,t)))})}static _fromUser(e){return new lr(e)}async getSession(){return sr._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const n=e,r=await this.getSession(),i=await le(this.user,n._process(this.user.auth,r,t));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){const t='string'==typeof e?e:e.uid,n=await this.user.getIdToken();try{const e=await le(this.user,(r=this.user.auth,i={idToken:n,mfaEnrollmentId:t},z(r,"POST","/v2/accounts/mfaEnrollment:withdraw",W(r,i))));this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==t),await this.user._updateTokensIfNecessary(e),await this.user.reload()}catch(e){throw e}var r,i}}const hr=new WeakMap;function pr(e){const t=(0,c.getModularInstance)(e);return hr.has(t)||hr.set(t,lr._fromUser(t)),hr.get(t)}const fr='__sak';
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class mr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fr,'1'),this.storage.removeItem(fr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class gr extends mr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=He(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);(0,c.isIE)()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent('storage',{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener('storage',this.boundEventHandler)}detachListener(){window.removeEventListener('storage',this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}gr.type='LOCAL';const Ir=gr;
/**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function _r(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,'\\$&'),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function yr(e){return`${'http:'===window.location.protocol?'__dev_':'__HOST-'}FIREBASE_${e.split(':')[3]}`}class vr{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set('finalTarget',e),t}async _isAvailable(){return!('boolean'==typeof isSecureContext&&!isSecureContext)&&('undefined'!=typeof navigator&&'undefined'!=typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=yr(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return _r(t)}async _remove(e){if(!this._isAvailable())return;if(!await this._get(e))return;const t=yr(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:'DELETE'}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;const n=yr(e);if(window.cookieStore){const e=e=>{const r=e.changed.find(e=>e.name===n);r&&t(r.value);e.deleted.find(e=>e.name===n)&&t(null)},r=()=>window.cookieStore.removeEventListener('change',e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener('change',e)}let r=_r(n);const i=setInterval(()=>{const e=_r(n);e!==r&&(t(e),r=e)},1e3);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}vr.type='COOKIE';const Tr=vr;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Er extends mr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Er.type='SESSION';const wr=Er;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function br(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Pr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Pr(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map(async e=>e(t.origin,i)),a=await br(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener('message',this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener('message',this.boundEventHandler)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function Ar(e="",t=10){let n='';for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */Pr.receivers=[];class Sr{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener('message',e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r='undefined'!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise((o,a)=>{const c=Ar('',20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(s),r.port1.addEventListener('message',s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function kr(){return window}function Or(e){kr().location.href=e}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Rr(){return void 0!==kr().WorkerGlobalScope&&'function'==typeof kr().importScripts}async function Nr(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Cr='firebaseLocalStorageDb',Dr='firebaseLocalStorage',Lr='fbase_key';class Mr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener('success',()=>{e(this.request.result)}),this.request.addEventListener('error',()=>{t(this.request.error)})})}}function Ur(e,t){return e.transaction([Dr],t?'readwrite':'readonly').objectStore(Dr)}function jr(){const e=indexedDB.deleteDatabase(Cr);return new Mr(e).toPromise()}function Fr(){const e=indexedDB.open(Cr,1);return new Promise((t,n)=>{e.addEventListener('error',()=>{n(e.error)}),e.addEventListener('upgradeneeded',()=>{const t=e.result;try{t.createObjectStore(Dr,{keyPath:Lr})}catch(e){n(e)}}),e.addEventListener('success',async()=>{const n=e.result;n.objectStoreNames.contains(Dr)?t(n):(n.close(),await jr(),t(await Fr()))})})}async function Vr(e,t,n){const r=Ur(e,!0).put({[Lr]:t,value:n});return new Mr(r).toPromise()}async function xr(e,t){const n=Ur(e,!1).get(t),r=await new Mr(n).toPromise();return void 0===r?null:r.value}function Hr(e,t){const n=Ur(e,!0).delete(t);return new Mr(n).toPromise()}class qr{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Fr()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Rr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pr._getInstance(Rr()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Nr(),!this.activeServiceWorker)return;this.sender=new Sr(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&(navigator?.serviceWorker?.controller||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Fr();return await Vr(e,fr,'1'),await Hr(e,fr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Vr(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>xr(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Hr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=Ur(e,!1).getAll();return new Mr(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}qr.type='LOCAL';const Wr=qr;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function zr(e,t){return z(e,"POST","/v2/accounts/mfaSignIn:start",W(e,t))}function Gr(e,t){return z(e,"POST","/v2/accounts/mfaSignIn:finalize",W(e,t))}function Kr(e,t){return z(e,"POST","/v2/accounts/mfaSignIn:finalize",W(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const $r=Xe('rcb'),Br=new j(3e4,6e4);class Jr{constructor(){this.hostLanguage='',this.counter=0,this.librarySeparatelyLoaded=!!kr().grecaptcha?.render}load(e,t=""){return R(Yr(t),e,"argument-error"),this.shouldResolveImmediately(t)&&X(kr().grecaptcha)?Promise.resolve(kr().grecaptcha):new Promise((n,r)=>{const i=kr().setTimeout(()=>{r(P(e,"network-request-failed"))},Br.get());kr()[$r]=()=>{kr().clearTimeout(i),delete kr()[$r];const s=kr().grecaptcha;if(!s||!X(s))return void r(P(e,"internal-error"));const o=s.render;s.render=(e,t)=>{const n=o(e,t);return this.counter++,n},this.hostLanguage=t,n(s)};Ye(`${Je.recaptchaV2Script}?${(0,c.querystring)({onload:$r,render:'explicit',hl:t})}`).catch(()=>{clearTimeout(i),r(P(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!kr().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Yr(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}class Xr{async load(e){return new Ze(e)}clearedOneInstance(){}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Qr='recaptcha',Zr={theme:'light',type:'image'};class ei{constructor(e,t,n={...Zr}){this.parameters=n,this.type=Qr,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=$e(e),this.isInvisible='invisible'===this.parameters.size,R('undefined'!=typeof document,this.auth,"operation-not-supported-in-this-environment");const r='string'==typeof t?document.getElementById(t):t;R(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Xr:new Jr,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),n=t.getResponse(e);return n||new Promise(n=>{const r=e=>{e&&(this.tokenChangeListeners.delete(r),n(e))};this.tokenChangeListeners.add(r),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){R(!this.parameters.sitekey,this.auth,"argument-error"),R(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),R('undefined'!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),'function'==typeof e)e(t);else if('string'==typeof e){const n=kr()[e];'function'==typeof n&&n(t)}}}assertNotDestroyed(){R(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement('div');e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){R(L()&&!Rr(),this.auth,"internal-error"),await ti(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await ee(this.auth);R(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return R(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function ti(){let e=null;return new Promise(t=>{'complete'!==document.readyState?(e=()=>t(),window.addEventListener('load',e)):t()}).catch(t=>{throw e&&window.removeEventListener('load',e),t})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ni{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=jt._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function ri(e,t,n){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const r=$e(e),i=await oi(r,t,(0,c.getModularInstance)(n));return new ni(i,e=>ln(r,e))}async function ii(e,t,n){const r=(0,c.getModularInstance)(e);await cn(!1,r,"phone");const i=await oi(r.auth,t,(0,c.getModularInstance)(n));return new ni(i,e=>hn(r,e))}async function si(e,t,n){const r=(0,c.getModularInstance)(e);if((0,a._isFirebaseServerApp)(r.auth.app))return Promise.reject(S(r.auth));const i=await oi(r.auth,t,(0,c.getModularInstance)(n));return new ni(i,e=>pn(r,e))}async function oi(e,t,n){if(!e._getRecaptchaConfig())try{await ct(e)}catch(e){console.log('Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.')}try{let r;if(r='string'==typeof t?{phoneNumber:t}:t,'session'in r){const t=r.session;if('phoneNumber'in r){R("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=at(e,i,"mfaSmsEnrollment",async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===it){R(n?.type===Qr,e,"argument-error");return cr(e,await ci(e,t,n))}return cr(e,t)},"PHONE_PROVIDER");return(await s.catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo}{R("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;R(i,e,"missing-multi-factor-info");const s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=at(e,s,"mfaSmsSignIn",async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===it){R(n?.type===Qr,e,"argument-error");return zr(e,await ci(e,t,n))}return zr(e,t)},"PHONE_PROVIDER");return(await o.catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=at(e,t,"sendVerificationCode",async(e,t)=>{if(t.captchaResponse===it){R(n?.type===Qr,e,"argument-error");return Ct(e,await ci(e,t,n))}return Ct(e,t)},"PHONE_PROVIDER");return(await i.catch(e=>Promise.reject(e))).sessionInfo}}finally{n?._reset()}}async function ai(e,t){const n=(0,c.getModularInstance)(e);if((0,a._isFirebaseServerApp)(n.auth.app))return Promise.reject(S(n.auth));await an(n,t)}async function ci(e,t,n){R(n.type===Qr,e,"argument-error");const r=await n.verify();R('string'==typeof r,e,"argument-error");const i={...t};if('phoneEnrollmentInfo'in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if('phoneSignInInfo'in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ui{constructor(e){this.providerId=ui.PROVIDER_ID,this.auth=$e(e)}verifyPhoneNumber(e,t){return oi(this.auth,e,(0,c.getModularInstance)(t))}static credential(e,t){return jt._fromVerification(e,t)}static credentialFromResult(e){const t=e;return ui.credentialFromTaggedObject(t)}static credentialFromError(e){return ui.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?jt._fromTokenResponse(t,n):null}}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function di(e,t){return t?Pe(t):(R(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */ui.PROVIDER_ID="phone",ui.PHONE_SIGN_IN_METHOD="phone";class li extends gt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Rt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Rt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Rt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hi(e){return dn(e.auth,new li(e),e.bypassAuthState)}function pi(e){const{auth:t,user:n}=e;return R(n,t,"internal-error"),un(n,new li(e),e.bypassAuthState)}async function fi(e){const{auth:t,user:n}=e;return R(n,t,"internal-error"),an(n,new li(e),e.bypassAuthState)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class mi{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hi;case"linkViaPopup":case"linkViaRedirect":return fi;case"reauthViaPopup":case"reauthViaRedirect":return pi;default:b(this.auth,"internal-error")}}resolve(e){C(this.pendingPromise,'Pending promise was never set'),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){C(this.pendingPromise,'Pending promise was never set'),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const gi=new j(2e3,1e4);async function Ii(e,t,n){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(P(e,"operation-not-supported-in-this-environment"));const r=$e(e);k(e,t,Wt);const i=di(r,n);return new vi(r,"signInViaPopup",t,i).executeNotNull()}async function _i(e,t,n){const r=(0,c.getModularInstance)(e);if((0,a._isFirebaseServerApp)(r.auth.app))return Promise.reject(P(r.auth,"operation-not-supported-in-this-environment"));k(r.auth,t,Wt);const i=di(r.auth,n);return new vi(r.auth,"reauthViaPopup",t,i,r).executeNotNull()}async function yi(e,t,n){const r=(0,c.getModularInstance)(e);k(r.auth,t,Wt);const i=di(r.auth,n);return new vi(r.auth,"linkViaPopup",t,i,r).executeNotNull()}class vi extends mi{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,vi.currentPopupAction&&vi.currentPopupAction.cancel(),vi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return R(e,this.auth,"internal-error"),e}async onExecution(){C(1===this.filter.length,'Popup operations only handle one event');const e=Ar();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(P(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(P(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vi.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(P(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,gi.get())};e()}}vi.currentPopupAction=null;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Ti='pendingRedirect',Ei=new Map;class wi extends mi{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Ei.get(this.auth._key());if(!e){try{const t=await bi(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Ei.set(this.auth._key(),e)}return this.bypassAuthState||Ei.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function bi(e,t){const n=Oi(t),r=ki(e);if(!await r._isAvailable())return!1;const i='true'===await r._get(n);return await r._remove(n),i}async function Pi(e,t){return ki(e)._set(Oi(t),'true')}function Ai(){Ei.clear()}function Si(e,t){Ei.set(e._key(),t)}function ki(e){return Pe(e._redirectPersistence)}function Oi(e){return ke(Ti,e.config.apiKey,e.name)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ri(e,t,n){return Ni(e,t,n)}async function Ni(e,t,n){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const r=$e(e);k(e,t,Wt),await r._initializationPromise;const i=di(r,n);return await Pi(i,r),i._openRedirect(r,t,"signInViaRedirect")}function Ci(e,t,n){return Di(e,t,n)}async function Di(e,t,n){const r=(0,c.getModularInstance)(e);if(k(r.auth,t,Wt),(0,a._isFirebaseServerApp)(r.auth.app))return Promise.reject(S(r.auth));await r.auth._initializationPromise;const i=di(r.auth,n);await Pi(i,r.auth);const s=await Fi(r);return i._openRedirect(r.auth,t,"reauthViaRedirect",s)}function Li(e,t,n){return Mi(e,t,n)}async function Mi(e,t,n){const r=(0,c.getModularInstance)(e);k(r.auth,t,Wt),await r.auth._initializationPromise;const i=di(r.auth,n);await cn(!1,r,t.providerId),await Pi(i,r.auth);const s=await Fi(r);return i._openRedirect(r.auth,t,"linkViaRedirect",s)}async function Ui(e,t){return await $e(e)._initializationPromise,ji(e,t,!1)}async function ji(e,t,n=!1){if((0,a._isFirebaseServerApp)(e.app))return Promise.reject(S(e));const r=$e(e),i=di(r,t),s=new wi(r,i,n),o=await s.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}async function Fi(e){const t=Ar(`${e.uid}:::`);return e._redirectEventId=t,await e.auth._setRedirectUser(e),await e.auth._persistUserIfCurrent(e),t}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Vi{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!qi(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Hi(e)){const n=e.error.code?.split('auth/')[1]||"internal-error";t.onError(P(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(xi(e))}saveEventToCache(e){this.cachedEventUids.add(xi(e)),this.lastProcessedEventTime=Date.now()}}function xi(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join('-')}function Hi({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}function qi(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Hi(e);default:return!1}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Wi(e,t={}){return z(e,"GET","/v1/projects",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const zi=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Gi=/^https?/;async function Ki(e){if(e.config.emulator)return;const{authorizedDomains:t}=await Wi(e);for(const e of t)try{if($i(e))return}catch{}b(e,"unauthorized-domain")}function $i(e){const t=D(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith('chrome-extension://')){const i=new URL(e);return''===i.hostname&&''===r?'chrome-extension:'===n&&e.replace('chrome-extension://','')===t.replace('chrome-extension://',''):'chrome-extension:'===n&&i.hostname===r}if(!Gi.test(n))return!1;if(zi.test(e))return r===e;const i=e.replace(/\./g,'\\.');return new RegExp('^(.+\\.'+i+'|'+i+')$','i').test(r)}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Bi=new j(3e4,6e4);function Ji(){const e=kr().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}function Yi(e){return new Promise((t,n)=>{function r(){Ji(),gapi.load('gapi.iframes',{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Ji(),n(P(e,"network-request-failed"))},timeout:Bi.get()})}if(kr().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!kr().gapi?.load){const t=Xe('iframefcb');return kr()[t]=()=>{gapi.load?r():n(P(e,"network-request-failed"))},Ye(`${Je.gapiScript}?onload=${t}`).catch(e=>n(e))}r()}}).catch(e=>{throw Xi=null,e})}let Xi=null;function Qi(e){return Xi=Xi||Yi(e),Xi}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Zi=new j(5e3,15e3),es={style:{position:'absolute',top:'-100px',width:'1px',height:'1px'},'aria-hidden':'true',tabindex:'-1'},ts=new Map([["identitytoolkit.googleapis.com",'p'],['staging-identitytoolkit.sandbox.googleapis.com','s'],['test-identitytoolkit.sandbox.googleapis.com','t']]);function ns(e){const t=e.config;R(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?F(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:a.SDK_VERSION},i=ts.get(e.config.apiHost);i&&(r.eid=i);const s=e._getFrameworks();return s.length&&(r.fw=s.join(',')),`${n}?${(0,c.querystring)(r).slice(1)}`}async function rs(e){const t=await Qi(e),n=kr().gapi;return R(n,e,"internal-error"),t.open({where:document.body,url:ns(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:es,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=P(e,"network-request-failed"),s=kr().setTimeout(()=>{r(i)},Zi.get());function o(){kr().clearTimeout(s),n(t)}t.ping(o).then(o,()=>{r(i)})}))}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const is={location:'yes',resizable:'yes',statusbar:'yes',toolbar:'no'};class ss{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function os(e,t,n,r=500,i=600){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a='';const u={...is,width:r.toString(),height:i.toString(),top:s,left:o},d=(0,c.getUA)().toLowerCase();n&&(a=De(d)?"_blank":n),Ne(d)&&(t=t||"http://localhost",u.scrollbars='yes');const l=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,'');if(xe(d)&&'_self'!==a)return as(t||'',a),new ss(null);const h=window.open(t||'',a,l);R(h,e,"popup-blocked");try{h.focus()}catch(e){}return new ss(h)}function as(e,t){const n=document.createElement('a');n.href=e,n.target=t;const r=document.createEvent('MouseEvent');r.initMouseEvent('click',!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const cs='__/auth/handler',us='emulator/auth/handler',ds=encodeURIComponent('fac');async function ls(e,t,n,r,i,s){R(e.config.authDomain,e,"auth-domain-config-required"),R(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:a.SDK_VERSION,eventId:i};if(t instanceof Wt){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||'',(0,c.isEmpty)(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(s||{}))o[e]=t}if(t instanceof zt){const e=t.getScopes().filter(e=>''!==e);e.length>0&&(o.scopes=e.join(','))}e.tenantId&&(o.tid=e.tenantId);const u=o;for(const e of Object.keys(u))void 0===u[e]&&delete u[e];const d=await e._getAppCheckToken(),l=d?`#${ds}=${encodeURIComponent(d)}`:'';return`${hs(e)}?${(0,c.querystring)(u).slice(1)}${l}`}function hs({config:e}){return e.emulator?F(e,us):`https://${e.authDomain}/${cs}`}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ps='webStorageSupport';const fs=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=wr,this._completeRedirectFn=ji,this._overrideRedirectResult=Si}async _openPopup(e,t,n,r){C(this.eventManagers[e._key()]?.manager,'_initialize() not called before _openPopup()');return os(e,await ls(e,t,n,D(),r),Ar())}async _openRedirect(e,t,n,r){await this._originValidation(e);return Or(await ls(e,t,n,D(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(C(n,'If manager is not set, promise should be'),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await rs(e),n=new Vi(e);return t.register('authEvent',t=>{R(t?.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ps,{type:ps},n=>{const r=n?.[0]?.[ps];void 0!==r&&t(!!r),b(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Ki(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return He()||Ce()||Fe()}};class ms{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return N('unexpected MultiFactorSessionType')}}}class gs extends ms{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new gs(e)}_finalizeEnroll(e,t,n){return ur(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Gr(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Is{constructor(){}static assertion(e){return gs._fromCredential(e)}}Is.FACTOR_ID='phone';class _s{static assertionForEnrollment(e,t){return ys._fromSecret(e,t)}static assertionForSignIn(e,t){return ys._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;R(void 0!==t.user?.auth,"internal-error");const n=await(r=t.user.auth,i={idToken:t.credential,totpEnrollmentInfo:{}},z(r,"POST","/v2/accounts/mfaEnrollment:start",W(r,i)));var r,i;return vs._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}}_s.FACTOR_ID="totp";class ys extends ms{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new ys(t,void 0,e)}static _fromEnrollmentId(e,t){return new ys(t,e)}async _finalizeEnroll(e,t,n){return R(void 0!==this.secret,e,"argument-error"),dr(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){R(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const n={verificationCode:this.otp};return Kr(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class vs{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new vs(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(Ts(e)||Ts(t))&&(n=!0),n&&(Ts(e)&&(e=this.auth.currentUser?.email||'unknownuser'),Ts(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Ts(e){return void 0===e||0===e?.length}var Es="@firebase/auth",ws="1.12.0";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class bs{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){R(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ps(e){switch(e){case"Node":return'node';case"ReactNative":return'rn';case"Worker":return'webworker';case"Cordova":return'cordova';case"WebExtension":return'web-extension';default:return}}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const As=(0,c.getExperimentalSetting)('authIdTokenMaxAge')||300;let Ss=null;const ks=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>As)return;const i=n?.token;Ss!==i&&(Ss=i,await fetch(e,{method:i?'POST':'DELETE',headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Os(e=(0,a.getApp)()){const t=(0,a._getProvider)(e,'auth');if(t.isInitialized())return t.getImmediate();const n=ut(e,{popupRedirectResolver:fs,persistence:[Wr,Ir,wr]}),r=(0,c.getExperimentalSetting)('authTokenSyncURL');if(r&&'boolean'==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=ks(e.toString());Qn(n,t,()=>t(n.currentUser)),Xn(n,e=>t(e))}}const i=(0,c.getDefaultEmulatorHost)('auth');return i&&lt(n,`http://${i}`),n}var Rs;Je={loadJS:e=>new Promise((t,n)=>{const r=document.createElement('script');r.setAttribute('src',e),r.onload=t,r.onerror=e=>{const t=P("internal-error");t.customData=e,n(t)},r.type='text/javascript',r.charset='UTF-8',(document.getElementsByTagName('head')?.[0]??document).appendChild(r)}),gapiScript:'https://apis.google.com/js/api.js',recaptchaV2Script:'https://www.google.com/recaptcha/api.js',recaptchaEnterpriseScript:'https://www.google.com/recaptcha/enterprise.js?render='},Rs="Browser",(0,a._registerComponent)(new d.Component("auth",(e,{options:t})=>{const n=e.getProvider('app').getImmediate(),r=e.getProvider('heartbeat'),i=e.getProvider('app-check-internal'),{apiKey:s,authDomain:o}=n.options;R(s&&!s.includes(':'),"invalid-api-key",{appName:n.name});const a={apiKey:s,authDomain:o,clientPlatform:Rs,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qe(Rs)},c=new Ke(n,r,i,a);return dt(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),(0,a._registerComponent)(new d.Component("auth-internal",e=>(e=>new bs(e))($e(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,a.registerVersion)(Es,ws,Ps(Rs)),(0,a.registerVersion)(Es,ws,'esm2020')},1329,[1318,1320,1322,1319]);
__d(function(g,r,i,a,m,_e,d){"use strict";Object.defineProperty(_e,'__esModule',{value:!0}),_e.loadIdentity=async function(){try{const t=await n.default.getItem(u),e=t?JSON.parse(t):null;return e?.playerId&&e?.tournamentId?e:null}catch{return null}},_e.saveIdentity=async function(t){await n.default.setItem(u,JSON.stringify(t))},_e.clearIdentity=async function(){await n.default.multiRemove([u,'invitationCode'])};var t,e=r(d[0]),n=(t=e)&&t.__esModule?t:{default:t};const u='playerIdentity'},1330,[795]);
__d(function(g,r,i,a,m,e,d){"use strict";function l(){return{'individual-strokeplay':100,'individual-matchplay':100,'fourball-strokeplay':90,'fourball-matchplay':90,'foursomes-strokeplay':50,'foursomes-matchplay':50,'bestball-strokeplay':90,'bestball-matchplay':90,scramble:35}}Object.defineProperty(e,'__esModule',{value:!0}),e.calculatePlayingHandicap=function(l,t=100){if(!l||0===l)return 0;if(!t||t<=0)return 0;const o=l*(t/100);return Math.round(o)},e.getStandardAllowances=l,e.getRecommendedAllowance=function(l,t){const o={'individual-strokeplay':100,'individual-matchplay':100,'fourball-strokeplay':90,'fourball-matchplay':90,'foursomes-strokeplay':50,'foursomes-matchplay':50,'bestball-strokeplay':90,'bestball-matchplay':90,scramble:35};return o[`${l}-${t}`]||100}},1331,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),Object.defineProperty(e,"COLLECTIONS",{enumerable:!0,get:function(){return n}}),Object.defineProperty(e,"generateIds",{enumerable:!0,get:function(){return t}}),Object.defineProperty(e,"TournamentSchema",{enumerable:!0,get:function(){return u}}),Object.defineProperty(e,"RoundSchema",{enumerable:!0,get:function(){return o}}),Object.defineProperty(e,"ScoreSchema",{enumerable:!0,get:function(){return s}}),Object.defineProperty(e,"GameSchema",{enumerable:!0,get:function(){return l}}),Object.defineProperty(e,"PlayerSchema",{enumerable:!0,get:function(){return p}}),Object.defineProperty(e,"CourseSchema",{enumerable:!0,get:function(){return c}}),e.validateTournament=function(n){const t=[];n.id&&'string'==typeof n.id||t.push('Tournament ID is required');n.tournamentName&&'string'==typeof n.tournamentName||t.push('Tournament name is required');Array.isArray(n.players)||t.push('Players must be an array');Array.isArray(n.roundIds)||t.push('Round IDs must be an array');return{valid:0===t.length,errors:t}},e.validateRound=function(n){const t=[];n.id&&'string'==typeof n.id||t.push('Round ID is required');n.tournamentId&&'string'==typeof n.tournamentId||t.push('Tournament ID is required');('number'!=typeof n.roundNumber||n.roundNumber<1)&&t.push('Round number must be a positive number');n.courseId&&'string'==typeof n.courseId||t.push('Course ID is required');Array.isArray(n.groups)||t.push('Groups must be an array');return{valid:0===t.length,errors:t}},e.validateScore=function(n){const t=[];n.id&&'string'==typeof n.id||t.push('Score ID is required');n.roundId&&'string'==typeof n.roundId||t.push('Round ID is required');('number'!=typeof n.holeNumber||n.holeNumber<1||n.holeNumber>18)&&t.push('Hole number must be between 1 and 18');n.playerScores&&'object'==typeof n.playerScores||t.push('Player scores must be an object');return{valid:0===t.length,errors:t}},e.validateGame=function(n){const t=[];n.id&&'string'==typeof n.id||t.push('Game ID is required');n.roundId&&'string'==typeof n.roundId||t.push('Round ID is required');n.tournamentId&&'string'==typeof n.tournamentId||t.push('Tournament ID is required');n.gameType&&'string'==typeof n.gameType||t.push('Game type is required');Array.isArray(n.teams)&&0!==n.teams.length||t.push('Teams must be a non-empty array');return{valid:0===t.length,errors:t}};const n={TOURNAMENTS:'tournaments',SCORES:'scores',GAMES:'games',PLAYERS:'players',COURSES:'courses',INVITATION_CODES:'invitationCodes'},t={scoreId:(n,t)=>`${n}-hole-${t}`},u={id:'TEST123',tournamentName:'Winter Classic 2025',active:!0,players:['dan-davis','tyler-jones'],createdAt:null,updatedAt:null,theme:{primaryColor:'#2e7d32',logoUrl:null}},o={id:'VdSHstxELwYIykzwLNx6',tournamentId:'TEST123',roundNumber:1,name:'Day 1',date:'2025-01-18',courseId:'webbs-reserve',groups:[{groupId:'group-1',groupIndex:0,teeTime:'9:00 AM',players:[{name:'Dan Davis',playerId:'dan-davis'},{name:'Tyler Jones',playerId:'tyler-jones'}]}],playerAssignments:{'dan-davis':{teeId:'CH',teeName:'Championship',courseHandicap:14.2,gender:'M'}},gameIds:['TEST123-round-1-bestball-1'],createdAt:null,updatedAt:null},s={id:'TEST123-round-1-hole-4',roundId:'TEST123-round-1',tournamentId:'TEST123',holeNumber:4,playerScores:{'dan-davis':4,'tyler-jones':5,'myles-jordan':5,'vince-melchionne':6},createdAt:null,updatedAt:null},l={id:'TEST123-round-1-bestball-1',roundId:'TEST123-round-1',tournamentId:'TEST123',gameType:'bestball',gameName:'Best Ball - 9:00 AM',groupIds:['group-1'],status:'active',format:'strokeplay',isBlindDraw:!1,config:{betAmount:20,useNetScoring:!0,handicapMethod:'full',handicapAllowance:100,payoutMethod:'winnerTakesAll'},teams:[{teamId:'team-a',teamName:'Team A',teamSize:2,players:['dan-davis','tyler-jones']}],results:{teamScores:{},holesWon:{},currentStatus:'AS',winner:null,complete:!1},payouts:null,createdAt:null,updatedAt:null},p={id:'dan-davis',name:'Dan Davis',email:null,handicapIndex:14.5,ghin:null,tournamentIds:['TEST123'],createdAt:null,updatedAt:null},c={id:'webbs-reserve',courseId:'webbs-reserve',courseName:"Webb's Reserve",location:'Punta Gorda, FL',par:72,tees:[{teeName:'Championship',teeId:'CH',gender:'M',par:72,rating:73.4,slope:137,holes:[{holeNumber:1,par:4,yardage:398,menHandicap:3,womenHandicap:5}]}],createdAt:null,updatedAt:null}},1332,[]);
__d(function(g,r,i,a,m,e,d){"use strict";Object.defineProperty(e,'__esModule',{value:!0}),e.calculateCourseHandicap=function(n,c){if(!(n&&c&&c.slope_rating&&c.course_rating))return 0;const t=c.slope_rating,o=c.course_rating,u=c.par_total||72,l=n*(t/113)+(o-u);return Math.round(10*l)/10},e.getHandicapStrokes=function(n,c){if(!n||!c)return 0;const t=Math.round(n);if(t<0)return c>18+t?-1:0;if(c<=t)return c<=t-18?2:1;return 0},e.calculateNetScore=function(n,c){if(!n||0===n)return 0;return n-c},e.getHoleHandicapForPlayer=function(n,c,t=null){if(!n)return 18;if(void 0!==n.handicap)return n.handicap;if('F'===c&&n.womenHandicap)return n.womenHandicap;if('M'===c&&n.menHandicap)return n.menHandicap;return n.menHandicap||n.womenHandicap||18},e.getStrokeIndicator=function(n){return 2===n?'\u25cf\u25cf':1===n?'\u25cf':''},e.calculatePlayingHandicaps=function(c,t,o=100){const u={};if(!c||0===c.length)return u;if('full'===t)c.forEach(c=>{const t=c.courseHandicap||0;u[c.name]=(0,n.calculatePlayingHandicap)(t,o)});else if('offLow'===t){const t=c.map(n=>n.courseHandicap||0),l=Math.min(...t);c.forEach(c=>{const t=(c.courseHandicap||0)-l;u[c.name]=(0,n.calculatePlayingHandicap)(t,o)})}else c.forEach(c=>{const t=c.courseHandicap||0;u[c.name]=(0,n.calculatePlayingHandicap)(t,o)});return u};var n=r(d[0])},1333,[1331]);