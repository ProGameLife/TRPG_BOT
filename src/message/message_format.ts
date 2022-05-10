const R_R = '<:r_m:956141658343342181>' + '<:r_r:956143706602344469>';
const R_L = '<:r_l:956141748898390056>' + '<:r_m:956141658343342181>';
const Y_R = '<:y_m:956142508365201468>' + '<:y_r:956143300782489620>';
const Y_L = '<:y_l:956143157484089394>' + '<:y_m:956142508365201468>';
const G_R = '<:g_m:956143065209389156>' + '<:g_r:956142434528661614>';
const G_L = '<:g_l:956143740475559987>' + '<:g_m:956143065209389156>';
const R_S = '<:r_s:956145243571511326>';
const G_S = '<:g_s:956145268900917278>';
const Y_S = '<:y_s:956145515689558036>';
const NX_LINE = '\n\n';

export const MAIN_GUIDE = 
    R_L + ' ** TRPG 음성 채널 이용 안내 ** ' + R_R + NX_LINE +
    R_S + ' 게임에 참가를 위해서 음성채팅방을 생성하시기 바랍니다.' + NX_LINE +
    R_S + ' 만들어진 음성채널에 다른 사용자들은 참가 하시면 됩니다.\n' + NX_LINE +
    Y_L + ' ** 게임 시작 전 사전 준비 사항 ** ' + Y_R + '\n' + NX_LINE +
    Y_S + ' 해당 음성채널에 들어간 후 각자 자신의 이름으로 쓰레드를 만들어 주세요.' + NX_LINE +
    Y_S + ' 만든 탐사자 스레드는 자신의 탐사지 시트 스레드가 됩니다.' + NX_LINE +
    Y_S + ' 자신의 탐사자 시트 스레드에서 ``!가이드`` 명령어를 입력 후 진행하시면 됩니다.\n';
    // G_L + ' ** 실시간 TRPG 음성 진행 현황 ** ' + G_R;

export const USER_ALL_GUIDE =
    R_L + ' ** 탐사자 생성 가이드 안내 ** ' + R_R + NX_LINE +
    R_S + ' 해당 채팅방을 기준으로 채널에 자신의 스레드를 생성해주세요.' + NX_LINE +
    R_S + ' 가이드 목록 순서대로 확인 후 진행해주시기 바랍니다.' + NX_LINE +
    R_S + ' 백스토리와 기능은 순서 상관없이 편한대로 진행하면 됩니다.' + NX_LINE +
    R_S + ' 가이드 확인 명령어 예시: **``!특성치``**, **``!정보``**, **``!기능``**, **``!백스토리``**, **``!장비``**' + NX_LINE +
    Y_L + ' ** 탐사자 생성 순서 ** ' + Y_R + NX_LINE +
    Y_S + ' 특성치 만들기' + NX_LINE +
    Y_S + ' 정보 입력하기' + NX_LINE +
    Y_S + ' 기능 선택하고 기능 점수 배분하기' + NX_LINE +
    Y_S + ' 백스토리 만들기' + NX_LINE +
    Y_S + ' 장비 갖추기';

export const MAKE_ABILITY_GUIDE =
    R_L + ' ** 특성치 결정하기 ** ' + R_R + NX_LINE +
    R_S + ' 3D6 주사위를 굴리고 5를 곱하여 근력, 건강, 민첩, 외모, 정신력을 정함' + NX_LINE +
    R_S + ' 2D6+6 주사위를 굴리고 5를 곱하여 크기, 지능, 교육을 정함' + NX_LINE +
    R_S + ' 나이에 따라서 특성치는 수정이 필요할 수 있습니다.' + NX_LINE +
    R_S + ' ``!특성치 자동`` 입력 시 특성치 생성을 자동으로 진행합니다.' + NX_LINE + 
    R_S + ' ``!특성치 수동`` 입력 시 특성값 등을 수동으로 작성이 가능합니다.' + NX_LINE +
    R_S + ' ``!특성치 초기화`` 입력 시 탐사자의 특성을 초기화합니다.' + NX_LINE +
    R_S + ' ``!특성치 입력 완료`` 명령어로 입력을 완료 하세요.' + NX_LINE;

export const MAKE_ABILITY_MANUAL_GUIDE =
    G_L + ' ** 특성치 수동으로 입력하기 ** ' + G_R + NX_LINE +
    G_S + ' 특성의 종류는 ``근력``, ``건강``, ``크기``, ``민첩성``, ``외모``, ``지능``, ``정신력``, ``교육``, ``행운`` 입니다.' + NX_LINE +
    G_S + ' 원하는 특성치의 값을 추가 하려면 ``!근력 80``의 형태로 명령어 입력시 적용 됩니다.' + NX_LINE +
    G_S + ' 현재까지 입력한 값을 확인 하려면 ``!특성치 확인``을 입력하여 특성치만 확인이 가능합니다.' + NX_LINE +
    G_S + ' 모든 입력이 끝나면 ``!특성치 입력 완료``를 입력하고 ``!가이드`` 명령어로 다음 단계를 진행하시오';

export const JOB_GUIDE =
    G_L + ' ** 정보 입력하기 ** ' + G_R + NX_LINE +
    G_S + ' ``!직업설정 경찰`` 특성치에 어울리는 직업을 센스있게 작성해주세요!' + NX_LINE +
    G_S + ' ``!나이설정 25`` 특성치와 컨셉이나 동료의 나이 등등 고려를 잘해주세요!' + NX_LINE +
    G_S + ' ``!이름설정 김나비`` 이쁜 이름을 지어주세요!' + NX_LINE +
    G_S + ' ``!성별설정 남자`` 이름과 특성에 맞는 성별을 지어주세요!' + NX_LINE +
    G_S + ' ``!사진설정 URL`` 자신의 아바타가 될 이미지 주소를 넣어 주세요!' + NX_LINE +
    G_S + ' URL 가져오기 : 디스코드 채팅창에 이미지를 올리고 이미지에 우클릭으로 주소를 가져오면 됩니다.' + NX_LINE +
    G_S + ' 모든 입력이 끝나면 ``!정보 입력 완료``를 입력하고 ``!가이드`` 명령어로 다음 단계를 진행하시오';

export const MAKE_SKILL_SET_GUIDE = 
    Y_L + ' ** 기능 결정하기 ** ' + Y_R + NX_LINE +
    Y_S + ' 탐사자들은 키퍼가 정한 스킬의 수 만큼 목록에서 선택해야합니다.' + NX_LINE +
    Y_S + ' 기능을 고를 때는 직업과 특성을 고려하여 골라야합니다.' + NX_LINE +
    Y_S + ' ``!기능목록`` 명령어로 선택가능한 기능 목록 확인이 가능합니다.' + NX_LINE +
    Y_S + ' 목록에서 ✨로 현재 어떤기능을 추가했는지 확인 가능합니다.' + NX_LINE +
    Y_S + ' 목록을 보면서 스킬포인트를 분배하여 자신이 사용할 스킬을 정합니다.' + NX_LINE +
    Y_S + ' ``!기능추가 관찰력 50``의 형식으로 명령어 사용이 가능합니다.' + NX_LINE +
    Y_S + ' 기능포인트는 사용 할 때 마다 차감되며 잘 배분해주시기 바랍니다.' + NX_LINE +
    Y_S + ' EX) 예술( 5% ) 항목에 50의 포인트를 주면 예술( 55% )가 됩니다.' + NX_LINE +
    Y_S + ' ``!기능초기화`` 입력 시 입력했던 값들이 모두 초기화 됩니다.' + NX_LINE +
    Y_S + ' 키퍼에게 기능목록 확인 후 ``!기능 입력 완료`` 입력하여 완료 해주시고 ``!가이드`` 명령어로 다음 단계를 진행하세요';

export const BACKSTORY_GUIDE =
    R_L + ' ** 백스토리 정하기 ** ' + R_R + NX_LINE +
    R_S + ' 탐사자의 친구, 적, 업적, 신념, 의미있는장소, 소중한물건, 성격을 작성해주세요.' + NX_LINE +
    R_S + ' 많은 내용을 적을 수록 탐사자의 모습이 생생하게 느껴집니다.' + NX_LINE +
    R_S + ' 플레이 하는동안 내용을 더 넣을 수도 있고 원래의 내용을 바꿀수도 있습니다.' + NX_LINE +
    R_S + ' 탐사자를 자세히 정의하면 플레이 도중에 어떤 행동과 반응을 할지 안내하는 간결한 지침이 됩니다.' + NX_LINE +
    R_S + ' 배경 항목은 구체적이고, 감성적이고, 공감하기 좋은 방향으로 작성하세요.' + NX_LINE +
    R_S + ' **좋아하는** 보다 **사랑하는**을, **싫어하는** 보다 **증오하는** 사적이고 의미있게 느껴지도록 작성해주세요' + NX_LINE +
    R_S + ' 배경을 정하기 힘들 때는 키퍼에게 문의해서 주사위로 주제를 받을 수 있습니다.' + NX_LINE +
    R_S + ' 주제로 받은 배경을 가지고 만들어도 괜찮습니다.' + NX_LINE +
    R_S + ' 배경 항목은 구체적이고, 감성적이고, 공감하기 좋은 방향으로 작성하세요.' + NX_LINE +
    R_S + ' 백스토리 입력시 . 입력하면 줄바꿈으로 인식합니다.' + NX_LINE +
    R_S + ' 예시 ) !백스토리입력 친구: 이름은 두덩이 성격은 뭐시깽하고 좋아하는건 뭐시깽이야.\n그리고 어렸을 때 어디어디 살았었어 등등' + NX_LINE +
    R_S + ' 백스토리 내용은 위 명령어를 다시 쓰면 덮어쓰기가 됩니다. 이에 유의하여 사용하시면 됩니다.' + NX_LINE +
    R_S + ' ``!가이드`` 명령어를 입력하여 다음으로 진행하세요.' + NX_LINE

export const EQUIP_GUIDE =
    G_L + ' ** 장비 입력하기 ** ' + G_R + NX_LINE +
    G_S + ' 장비는 시나리오 진행중에 사용할 수 있습니다.' + NX_LINE +
    G_S + ' 장비를 추가 할때 키퍼에게 문의하면서 진행해주세요.' + NX_LINE +
    G_S + ' ``!장비추가 손전등`` 명령어로 장비를 추가 할 수 있습니다. ' + NX_LINE + 
    G_S + ' ``!장비초기화`` 입력하면 입력한 장비 내용이 지워집니다.';

export const KPC_GUIDE =
    G_L + ' ** 각종 명령어 가이드 ** ' + G_R + NX_LINE +
    G_S + ' 키퍼는 다양한 명령어로 탐사자들을 컨트롤 할 수 있습니다.' + NX_LINE +
    G_S + ' KPC의 명령어는 ``!KPC``로 시작합니다.' + NX_LINE +
    G_S + ' ``!KPC 탐사자ID(디코 프로필ID) 변경항목 변경값`` 의 형태로 사용가능' + NX_LINE +
    G_S + ' 예시 ) !KPC 950231695163031603 이성치 40' + NX_LINE +
    G_S + ' ``!KPC 탐사자ID 빈사(광기) 일시적광기(장기적광기,빈사상태)``' + NX_LINE +
    G_S + ' 예시 ) !KPC 950231695163031603 광기 일시적광기' + NX_LINE +
    G_S + ' ``!KPC 탐사자ID 정보삭제``' + NX_LINE +
    G_S + ' 예시 ) !KPC 950231695163031603 정보삭제' + NX_LINE +
    G_S + ' ``!KPC 탐사자ID 스킬포인트 100``' + NX_LINE +
    G_S + ' 예시 ) !KPC 950231695163031603 스킬포인트 100' + NX_LINE +
    G_S + ' ``!템플릿 저장 탐사자ID``' + NX_LINE +
    G_S + ' 예시 ) !템플릿 저장 950231695163031603' + NX_LINE +
    G_S + ' ``!템플릿 목록``' + NX_LINE +
    G_S + ' 예시 ) !템플릿 목록' + NX_LINE +
    G_S + ' ``!템플릿 불러오기 템플릿번호``' + NX_LINE +
    G_S + ' 예시 ) !템플릿 불러오기 4' + NX_LINE;