<template>
    <v-container fluid>
      <v-app-bar
      app
      color="primary"
      dark
    >

      <v-btn
        left
        @click="toUserHome()"
        target="_blank"
        text
      >

        <span class="mr-2">Назад</span>
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      
      <v-text style="font-size:32px">Матэрыялы</v-text>
    </v-app-bar>

    <v-expansion-panels>
    <v-expansion-panel
    v-for="section in sections"
          :key="section.title"
    >
      <v-expansion-panel-header>
          {{section.title}}
      </v-expansion-panel-header>

      <v-expansion-panel-content
        v-for="paragraph in section.paragraphs"
          :key="paragraph.title"
      >
        <b>{{paragraph.title}}</b><br>
        <p v-html=paragraph.text></p>
      </v-expansion-panel-content>

    </v-expansion-panel>
    </v-expansion-panels>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      sections: [
        { title: 'ПРАВАПІС ГАЛОСНЫХ', paragraphs: [{
            title: "Галосныя літары",
            text: '1. У беларускім алфавіце 10 галосных літар: а, о, у, ы, э, е, ё, і, ю, я.<br>2. Літары а, о, э, у пішуцца ў пачатку слова і пасля цвёрдых зычных для абазначэння адпаведных галосных гукаў. Літара і пішацца ў пачатку слова, пасля зычных пішацца ы або і ў залежнасці ад цвёрдасці або мяккасці зычных. Літары е, ё, ю, я ў пачатку слова, у сярэдзіне слова пасля галосных, ў (у нескладовага), раздзяляльнага мяккага знака і апострафа абазначаюць на пісьме спалучэнне зычнага гука [й] з галоснымі [э], [о], [у], [а]: елка –– [йэ]лка, юны –– [йу]ны, яма –– [йа]ма; паехаў ––па[йэ]хаў, паёк –– па[йо]к, саюз –– са[йу]з; здароўе –– здароў[йэ]; льеш –– ль[йэ]ш; аб’езд –– аб[йэ]зд, б’ю –– б[йу], сям’я — сям[йа].\n3. Літары я, ё, е, ю, і пасля зычных абазначаюць мяккасць зычных і адпаведныя галосныя гукі [а], [о], [э], [у], [і]: сяду –– [с’а]ду, вязу –– [в’а]зу, мёд –– [м’о]д, лета –– [л’э]та, люты –– [л’у]ты, ліст –– [л’і]ст.<br>4. Кропкі над літарай ё абавязковыя. Кропка над літарай і малой абавязковая. Над літарай І вялікай у друкаваных тэкстах кропка не ставіцца, а ў рукапісных тэкстах кропка абавязковая.'
            },
            {
            title: "Літары о, ё",
            text: "1. Літара о пішацца толькі пад націскам: год, кот, скрозь, шоўк, ко'лас, мо'ва, до'ўга, по'суд, аро'л, шо'лах, плячо', даро'га, разго'ртваць, дапамо'га, дадатко'ва, жніво', дэпо', во'дар, о'канне, о'да, о'птам, о'рдэн, о'фіс, о'пера, Об, Орша, Омск, Обнінск, Осла, Оксфард, Орск, То'кіа, Ватэрло'а.<br>2. Літара ё пішацца пад націскам: лёс, вёска, сёстры, цёмны, цёплы.<br>Літара ё пішацца не пад націскам у словах з коранем ёд- і ёт-: ёдапіры'н, ёта'цыя, ётава'нне.<br>3. Літара ё пішацца ў складаных словах з першай часткай радыё-: радыёстанцыя, радыёграма, радыёантэна.<br>Калі першая частка складанага слова ўтворана ад назвы хімічнага элемента радый, то пішацца літара е, якая з’яўляецца злучальнай галоснай: радыебіяло'гія, радыеакты'ўнасць, радыеметры'чны, радыеізато'п і інш. У першым складзе перад націскам у гэтым выпадку пішацца я: радыяме'трыя, радыяхі'мія, радыяло'гія, радыягра'фія."
            },
            {
            title: "Літары э, е",
            text: "1. Літара э пішацца:<br>у пачатку выклічнікаў э, эге, эге-ге, эй, эх;<br>пасля прыстаўной літары г у слове гэты і вытворных ад яго (дагэтуль), а таксама ў выклічніках гэ, гэй і назвах літар (бэ, вэ і інш.);<br>пасля шыпячых, [р], [д], [т] і цвёрдага [ц]: жэрдка, жэмчуг, шэры, нашэсце, чэрствы, чэк, нараджэнне, абуджэнне, рэкі, рэзаць, халадэча, сардэчны, пустэча, мястэчка, цэны, у руцэ.<br>2. У пачатку запазычаных слоў літары э, е як пад націскам, так і не пад націскам пішуцца ў адпаведнасці з літаратурным вымаўленнем: э'ра, эсэ', э'ўрыка, э'пас, э'тыка, Эўклі'д, Эўрыпі'д, Элі'ста; е'гер, е'рась, ерэты'к, Еўро'па, еўрапе'йскі, Еўпато'рыя, Ерэва'н, ерэва'нец, Еўфра'т.<br>На канцы запазычаных нязменных слоў, а таксама ўласных імён і геаграфічных назваў пасля зычных, акрамя л, к, пішацца э: купэ', рэзюмэ', рэнамэ', кафэ', галіфэ', кашнэ', кабернэ', фрыкасэ', плісэ', каратэ', дэкальтэ'; Стру'вэ, Мерымэ', Эйвэ', Хасэ', Мо'рзэ, Табі'дзэ, Брыгва'дзэ, Каба-Ве'рдэ, Душанбэ', Сан-Тамэ'; але: са'льта-марта'ле, філе', камюніке', піке'.<br>3. Літара э ў запазычаных словах пасля губных зычных, а таксама пасля з, с, н пішацца згодна з літаратурным вымаўленнем. Так, словы капэ'ла, сурвэ'тка, экзэмпля'р, маянэ'з, тунэ'ль, сэ'рвіс, інтэрнэ'т пішуцца з літарай э, а словы меда'ль, ме'неджмент, не'рвы, парла'мент, перспекты'ва, газе'та, серві'з –– з літарай е.<br>4. У запазычаных словах, адзначаных у пунктах 2 і 3 гэтага параграфа, напісанне э, е вызначаецца па слоўніку."
            },
            {
            title: "Перадача акання на пісьме",
            text: "1. Галосныя гукі [о], [э] ў ненаціскным становішчы чаргуюцца з [а]: дом –– дамы', мо'ва –– маўле'нне, цэ'гла –– цагля'ны, шэпт –– шапта'ць.<br>2. Незалежна ад паходжання слова гук [о] ў ненаціскных складах вымаўляецца як [а], што перадаецца на пісьме: гара', вада', баранава'нне, ко'лас, хо'лад, бало'та, Бандарэ'нка, Ко'ханава, Ку'нцава, Гаме'р, Сакра'т, арганіза'цыя, педагагі'чны, электара'т, харэагра'фія, заало'гія.<br>Не падпарадкоўваюцца аканню словы са спалучэннямі ро, ло, якія чаргуюцца з ры, лы: кроў –– крыві' –– крыва'вы, дро'вы –– дрыво'тня, кро'шка –– крышы'ць, бро'вы –– брыво', гром –– грымо'ты –– грыме'ць, брод –– брысці', гло'тка –– глыта'ць, бло'хі –– блыха'.<br>3. У словах славянскага паходжання і запазычаных словах, цалкам адаптаваных у беларускай мове, галосны [э] ва ўсіх ненаціскных складах чаргуецца з [а] і абазначаецца на пісьме літарай а: стрэ'хі –– страха', шэ'ры –– шарэ'ць, чэ'ргі –– чарга', крэмль –– крамлёўскі, жэ'мчуг ––жамчу'жына, арэ'нда –– арандава'ць, майстэ'рня –– ма'йстар.<br>Ва ўласных імёнах са славянскай лексічнай асновай і ў даўно запазычаных словах з неславянскіх моў у ненаціскных складах гук [э] падпарадкоўваецца агульным правілам акання –– пасля цвёрдых зычных ён чаргуецца з [а] і абазначаецца на пісьме літарай а: Беразіно', Чарапаве'ц, Жамчу'жнікаў, Чарнышэ'ўскі, Шаўчэ'нка, Чалю'скін, лі'тара, транслітара'цыя.<br>4. Перадача на пісьме [э] ў іншых запазычаных словах у ненаціскных складах асновы вызначаецца наступнымі правіламі:<br>у пачатку слова [э] перадаецца на пісьме літарай э ў адпаведнасці з беларускім літаратурным вымаўленнем: экано'мія, экза'мен, эква'тар, этажэ'рка, элеме'нт. Літара э пішацца пасля прыставак і ў другой частцы складанага слова: праэкзаменава'ць, трохэлеме'нтны, квінтэсэ'нцыя;<br>пасля шыпячых, [р], [д], [т] і цвёрдага [ц] пішацца э: жэто'н, Жэне'ва, Жэра'р, жэлаці'н, чэкме'нь, рэспу'бліка, рэфо'рма, Рэма'рк, рэкла'ма, рэа'ктар, рэві'зія, агрэга'т, рэжы'м, рэко'рд, рэе'стр, рэвалю'цыя, дэта'ль, гардэро'б, Дэтро'йт, Дэфо', дэлега'т, дэманстра'цыя, о'рдэн, тэо'рыя, тэа'тр, тэлегра'ф, тэлефо'н, ветэра'н, ка'тэт, тэрмо'метр, тэарэ'ма, цэнтралі'зм, цэві'та.<br>5. У запазычаных словах напісанне э і а пасля зычных, акрамя шыпячых, [р], [д], [т] і цвёрдага [ц], вызначаецца па слоўніку: панэ'ль; але: шыне'ль.<br>6. Ненаціскныя фіналі -эль, -эр у запазычаных словах перадаюцца як -аль, -ар: шні'цаль, шпа'таль, мі'таль, фо'рталь, ка'рцар, грэ'йдар, лі'дар, камп’ю'тар, пэ'йджар, рэйсфе'дар, эспа'ндар, тэ'ндар, о'рдар, ме'неджар, фарва'тар, а'льма-ма'тар, кра'тар, прэсві'тар.<br>Ненаціскныя фіналі -эль, -эр ва ўласных імёнах іншамоўнага паходжання перадаюцца нязменна: Ландэр, Одэр, Пітэр, Юпітэр."
            },
          ]
        },
        { title: 'ПРАВАПІС ЗЫЧНЫХ', paragraphs: [{
            title: "Зычныя літары",
            text: "1. Для абазначэння зычных гукаў у беларускай мове выкарыстоў­ваецца 21 літара: б, в, г, д, ж, з, й, к, л, м, н, п, р, с, т, ў, ф, х, ц, ч, ш.<br>2. Асобныя гукі не маюць спецыяльных літар: афрыкаты [дж], [дз] і мяккі [дз’] перадаюцца на пісьме адпаведна спалучэннямі літар д і ж, д і з: хаджу, ваджу, ксяндзы, пэндзаль, хадзіў, вадзіў, дзюны, дзень, дзіва.<br>3. Гук [й] перадаецца або літарай й (на канцы склада пасля галосных: рэйка, май), або літарамі е, ё, і, ю, я, якія адпаведна абазначаюць спалучэнні гукаў [йэ], [йо], [йі], [йу], [йа] ў пачатку слова, пасля галосных, апострафа, раздзяляльнага мяккага знака і ў (у нескладовага): яма, ёмкі, ехаць, іней, юшка, маянэз, аб’ява, пад’ём, пад’ехаць, раз’юшаны, уецца, уюн, маёр, медальён, салаўі, салью, альянс, саўю."
            },
          ]
        },
        { title: 'ПРАВАПІС МЯККАГА ЗНАКА І АПОСТРАФА', paragraphs: [{
            title: "Змякчальны мяккі знак",
            text: "1. Мяккі знак пішацца пасля зычных з, л, н, с, ц (з мяккага т), дз (з мяккага д):<br>для абазначэння на пісьме мяккасці зычнага на канцы слова: мядзведзь, дзень, соль, вось, чытаць, пісаць, стань, кінь, лезь, шэсць, дзесяць, штось, дзесь, кудысь, чагось, вішань, кухань, соцень, песень;<br>для абазначэння на пісьме мяккасці зычнага перад цвёрдым зычным: дзядзька, бацька, касьба, барацьба, пісьмо, Вязьма, Кузьма, восьмы, процьма, дзьмухавец;<br>для абазначэння на пісьме мяккасці зычнага перад наступным мяккім зычным тады, калі пры змене формы таго ж слова (або пры замене яго другім словам таго ж кораня) гэты мяккі зычны становіцца цвёрдым, а папярэдні зычны захоўвае сваю мяккасць: барацьбе, барацьбіт (барацьба), пісьменнік (пісьмо), васьмі, васьмю (восьмы), цьмяны (цьма). Калі пры змене формы таго ж слова (або пры замене яго другім словам таго ж кораня) мяккасць зычных не захоўваецца, то мяккасць зычнага перад наступным мяккім зычным на пісьме мяккім знакам не абазначаецца: дзве –– два, шэсць –– шосты, звінець –– звон.<br>2. Мяккі знак пішацца для абазначэння мяккасці зычных у дзея­словах загаднага ладу:<br>перад канчаткам першай асобы множнага ліку -ма: кіньма, сядзьма, станьма;<br>перад канчаткам другой асобы множнага ліку -це: будзьце, кіньце, сядзьце, станьце, намыльце;<br>перад зваротнай часціцай -ся: кінься, звесься.<br>3. Мяккі знак пішацца для абазначэння мяккасці зычных у назоў­ніках перад канчаткам творнага склону множнага ліку -мі: коньмі, людзьмі, грудзьмі, дзецьмі.<br>4. Мяккі знак пішацца:<br>у складаных лічэбніках: пяцьдзясят, шэсцьдзясят, пяцьсот, шэсцьсот, дзевяцьсот;<br>у часціцы -сьці, якая ўваходзіць у склад слова: штосьці, чагосьці, кудысьці, дзесьці, чамусьці, якісьці;<br>у слове ледзьве.<br>5. Мяккі знак пішацца для абазначэння на пісьме мяккасці [л] перад зычнымі: пальцы, кольцы, відэльцы, сальца, вальцы, колькі, толькі, гульні, вельмі, Альф’еры, бразільскі (Бразілія), венесуэльскі (Венесуэла), уральскі (Урал), лепельскі (Лепель), лільскі (Ліль), Мангальф’е.<br>6. Мяккі знак пішацца для абазначэння на пісьме мяккасці [н]:<br>перад суфіксам -к-, а таксама перад суфіксам -чык- (калі слова без суфікса -чык- заканчваецца мяккім знакам): песенька, вішанька, нянька (і няньчыць); каменьчык (камень), праменьчык (прамень), карэньчык (корань), агеньчык (агонь);<br>перад суфіксам -ск- у прыметніках, утвораных ад назваў месяцаў, якія заканчваюцца мяккім [н’], і назоўніка восень: студзеньскі, чэрвеньскі, ліпеньскі, снежаньскі, восеньскі, а таксама ў суадносных уласных назвах: Чэрвеньскі раён, Ліпеньская школа;<br>у суфіксе -еньк- (-эньк-, -аньк-): маленькі, даражэнькі, прыгожанькі.<br>7. Мяккі знак не пішацца:<br>пасля шыпячых (ж, дж, ч, ш), р, ц (не з т мяккага) і д, т, а таксама пасля губных б, в, м, п, ф: дождж, ноч, мыш, цар, купец, голуб, п’едэстал, сям’я, В’етнам, верф;<br>пасля з, с, ц, дз перад мяккімі зычнымі, калі пры змене формы таго ж слова (або пры замене яго другім словам таго ж кораня) нельга паставіць гэтыя з, с, ц, дз перад цвёрдым зычным: песня –– песні –– песнямі, звер –– зверам –– звяроў, свет –– свяціць –– асвятленне, дзверы –– дзвярэй, чацвер –– чацвяргом, чацвёрты –– чацвярціна –– чацверыком, цвёрды –– сцвярджаць; схіліцца, скінуць, ёсць, Дзвіна, Дзмітрый;<br>пры падаўжэнні зычных: насенне, ралля, галлё, калоссе, а таксама падваенні: ззяць;<br>у прыметніках з суфіксам -ск-, утвораных ад назоўнікаў на -нь: конскі (конь), астраханскі (Астрахань), любанскі (Любань), плзенскі (Плзень), чань-чунскі (Чань-Чунь), цянь-шанскі (Цянь-Шань)."
            }
          ]
        }
      ],
    }),
    methods:{
      toUserHome(){
         this.$router.push({name: 'user', params: {id: '102'} })
       }
    }
  }
</script>