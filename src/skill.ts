import { Message } from "discord.js";
import { 
    get_skill_list, 
    get_skill_point,
    get_ability_idea, 
    get_uses_skill_list, 
    get_count_uses_skill_list, 
} from "./sql/select";
import { 
    update_skill_point, 
    update_use_skill_point, 
    update_reset_uses_skill,
} from "./sql/update";
import { upsert_uses_skill } from "./sql/upsert";

export let skill_add = {
    start: false,
};

export const get_user_all_skill_list = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!기능목록')) return;

    const skill_list_arr = await make_user_skill_list(user_id);
    await message.channel.sendTyping();
    await message.channel.send(
        '>>> **잔여 기능포인트 : ** '+ skill_list_arr[0] + '\n' +
        '회계( ' + skill_list_arr[1] + '% )\t\t\t\t\t\t 인류학( ' + skill_list_arr[2] + '% )\t\t\t\t\t\t  고고학( ' + skill_list_arr[3] + '% )\n' +
        '예술( ' + skill_list_arr[4] + '% )\t\t\t\t\t\t   천문학( ' + skill_list_arr[5] + '% )\t\t\t\t\t\t  흥정( ' + skill_list_arr[6] + '% )\n' +
        '생물학( ' + skill_list_arr[7] + '% )\t\t\t\t\t\t화학( ' + skill_list_arr[8] + '% )\t\t\t\t\t\t\t  등반( ' + skill_list_arr[9] + '% )\n' +
        '컴퓨터( ' + skill_list_arr[10] + '% )\t\t\t\t\t\t은닉( ' + skill_list_arr[11] + '% )\t\t\t\t\t\t\t제작( ' + skill_list_arr[12] + '% )\n' +
        '신용( ' + skill_list_arr[13] + '% )\t\t\t\t\t\t 크툴루신화( ' + skill_list_arr[14] + '% )\t\t\t\t  변장( ' + skill_list_arr[15] + '% )\n' +
        '회피( ' + skill_list_arr[16] + '% )\t\t\t\t\t\t  운전( ' + skill_list_arr[17] + '% )\t\t\t\t\t\t\t전기수리( ' + skill_list_arr[18] + '% )\n' +
        '전자공학( ' + skill_list_arr[19] + '% )\t\t\t\t\t말주변( ' + skill_list_arr[20] + '% )\t\t\t\t\t\t  응급치료( ' + skill_list_arr[21] + '% )\n' +
        '지질학( ' + skill_list_arr[22] + '% )\t\t\t\t\t\t숨기( ' + skill_list_arr[23] + '% )\t\t\t\t\t\t\t역사( ' + skill_list_arr[24] + '% )\n' +
        '도약( ' + skill_list_arr[25] + '% )\t\t\t\t\t\t법률( ' + skill_list_arr[26] + '% )\t\t\t\t\t\t\t  자료조사( ' + skill_list_arr[27] + '% )\n' +
        '듣기( ' + skill_list_arr[28] + '% )\t\t\t\t\t\t자물쇠다루기( ' + skill_list_arr[29] + '% )\t\t\t\t무술( ' + skill_list_arr[30] + '% )\n' +
        '기계수리( ' + skill_list_arr[31] + '% )\t\t\t\t의학( ' + skill_list_arr[32] + '% )\t\t\t\t\t\t\t  자연사( ' + skill_list_arr[33] + '% )\n' +
        '위치파악( ' + skill_list_arr[34] + '% )\t\t\t\t신비학( ' + skill_list_arr[35] + '% )\t\t\t\t\t\t   중장비운전( ' + skill_list_arr[36] + '% )\n' +
        '외국어( ' + skill_list_arr[37] + '% )\t\t\t\t\t   모국어( ' + skill_list_arr[38] + '% )\t\t\t\t\t\t  사진술( ' + skill_list_arr[39] + '% )\n' +
        '물리학( ' + skill_list_arr[40] + '% )\t\t\t\t\t   조종( ' + skill_list_arr[41] + '% )\t\t\t\t\t\t\t   항공기조종( ' + skill_list_arr[42] + '% )\n' +
        '선박조종( ' + skill_list_arr[43] + '% )\t\t\t\t  정신분석( ' + skill_list_arr[44] + '% )\t\t\t\t\t   심리학( ' + skill_list_arr[45] + '% )\n' +
        '승마( ' + skill_list_arr[46] + '% )\t\t\t\t\t\t  잠행( ' + skill_list_arr[47] + '% )\t\t\t\t\t\t\t수영( ' + skill_list_arr[48] + '% )\n' +
        '던지기( ' + skill_list_arr[49] + '% )\t\t\t\t\t추적( ' + skill_list_arr[50] + '% )\t\t\t\t\t\t\t권총사격( ' + skill_list_arr[51] + '% )\n' +
        '기관총사격( ' + skill_list_arr[52] + '% )\t\t\t 소총사격( ' + skill_list_arr[53] + '% )\t\t\t\t\t산탄총사격( ' + skill_list_arr[54] + '% )\n' +
        '기관단총( ' + skill_list_arr[55] + '% )\t\t\t\t 주먹질( ' + skill_list_arr[56] + '% )\t\t\t\t\t\t붙잡기( ' + skill_list_arr[57] + '% )\n' +
        '박치기( ' + skill_list_arr[58] + '% )\t\t\t\t\t 발차기( ' + skill_list_arr[59] + '% )\t\t\t\t\t\t관찰력( ' + skill_list_arr[60] + '% )\n' +
        '매혹( ' + skill_list_arr[61] + '% )\t\t\t\t\t\t 설득( ' + skill_list_arr[62] + '% )\t\t\t\t\t\t\t수학( ' + skill_list_arr[63] + '% )\n'
    );
};

export const add_user_skill_list = async (message: Message<boolean> , user_id: string) => {
    if(!(message.content.startsWith('!기능추가'))) return;

    const add_skill_command = message.content.split(' ');
    let skill_name = add_skill_command[1]; // 관찰력
    let skill_stat = Number(add_skill_command[2]); // 45 기존 기능 값에 + 해서 입력해야함
    const temp_stat = skill_stat;

    const skill_point = await get_skill_point(user_id);
    if(skill_point < skill_stat){
        message.channel.send('잔여 기능포인트가 부족합니다. ``!기능목록`` 확인 후 진행해주시기 바랍니다.');
        return;
    }

    switch(true){
        case ['등반'].includes(skill_name):
            skill_stat += 40;
            break;
        case ['주먹질'].includes(skill_name):
            skill_stat += 50;
            break;
        case ['응급치료', '산탄총사격'].includes(skill_name):
            skill_stat += 30;
            break;
        case ['기계수리', '운전', '역사', '권총사격'].includes(skill_name):
            skill_stat += 20;
            break;
        case ['신용', '기관총사격', '기관단총', '매혹', '은닉', '설득'].includes(skill_name):
            skill_stat += 15;
            break;
        case ['예술', '승마', '의학', '신비학', '흥정', '제작', '심리학'].includes(skill_name):
            skill_stat += 5;
            break;
        case ['회계', '위치파악', '박치기', '숨기', '추적', '전기수리', '자연사', '사진술', '수학'].includes(skill_name):
            skill_stat += 10;
            break;
        case ['도약', '듣기', '던지기', '잠행', '소총사격', '발차기', '자료조사', '수영', '붙잡기', '관찰력'].includes(skill_name):
            skill_stat += 25;
            break;
        case ['생물학', '컴퓨터', '전자공학', '지질학', '외국어', '물리학', '인류학', '천문학', '화학', '자물쇠다루기', '조종', '정신분석', '고고학', '변장', '무술'].includes(skill_name):
            skill_stat += 1;
            break;
    }
    const skill_data = await make_uses_skill_data(user_id, skill_name, skill_stat, temp_stat);

    await update_use_skill_point(user_id, temp_stat); // 잔여기능포인트 업데이트
    await upsert_uses_skill(user_id, skill_data.skill_name, skill_data.skill_stat, skill_data.use_point);
    await message.channel.send(skill_name + '( ' + skill_stat + '% ) 기능이 추가 되었습니다.');

    return;
};

export const show_user_skill_list = async (message: Message<boolean> , user_id: string) => {
    if(!(message.content === '!기능확인')) return;
    const show_skill_list = get_uses_skill_list(user_id);
    const use_point = (await show_skill_list).flatMap((element) => {
        return element.use_point;
    });
    const skill_name = (await show_skill_list).flatMap((element) => {
        return element.skill_name ?? ' ';
    });
    const skill_stat = (await show_skill_list).flatMap((element) => {
        return element.skill_stat ?? ' ';
    });

    message.channel.send('사용한 포인트 : ' + use_point[0] + '\n기능 목록들 : ' + skill_name[0] + '\n기능 스탯들 : ' + skill_stat[0]);
    
    return;
};

const make_uses_skill_data = async (user_id: string, skill_name: string, skill_stat: number, temp_point: number) => {
    let use_point = 0;
    let temp_skill_stat = '';
    const check_skill = await get_uses_skill_list(user_id);
    const ckeck_skill_name = check_skill.flatMap((element) => {
        return element.skill_name;
    })

    if(!(ckeck_skill_name[0] === '')){ // 이미 기능추가를 한적있는지
        const skill_uses_list = get_uses_skill_list(user_id);
        const use_stack_point = (await skill_uses_list).flatMap((element) => { // 지금까지 사용한 포인트
            return element.use_point;
        });
        const use_stack_skill_name = (await skill_uses_list).flatMap((element) => { // 지금까지 사용한 포인트
            return element.skill_name;
        });
        const use_stack_skill_stat = (await skill_uses_list).flatMap((element) => { // 지금까지 사용한 포인트
            return element.skill_stat;
        });

        temp_skill_stat = use_stack_skill_stat + ',' + String(skill_stat);
        use_point = temp_point + use_stack_point[0];
        skill_name = use_stack_skill_name + ',' + skill_name;
    }else{
        use_point = temp_point;
        temp_skill_stat = String(skill_stat);
    }

    const result = {
        skill_stat: temp_skill_stat,
        skill_name: skill_name,
        use_point: use_point,
    }

    return result;
};

export const clear_user_skill = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!기능초기화')) return;

    await update_skill_point(user_id, await make_skill_point(user_id));
    await update_reset_uses_skill(user_id);
    
    await message.channel.send('기능 초기화 되었습니다. 기능을 다시 추가 해주세요.');

    return;
};

export const make_skill_point = async (user_id: string) => {
    const idea = await get_ability_idea(user_id) * 2;

    return idea;
};

export const end_user_skill = async (message: Message<boolean>, ) => {
    if(!(message.content === '!기능 입력 완료')){
        skill_add.start = true;
    }

    await message.channel.send('기능 입력이 완료되었습니다. ``!가이드`` 명령어 입력 후 계속 진행해주세요');
    return;
};

export const view_uses_skill_list = async (user_id: string) => {
    const uses_skill_list = await get_uses_skill_list(user_id);

    const skill_name = uses_skill_list.flatMap((element) => {
        return element.skill_name ?? '빈기능';
    });
    const skill_stat = uses_skill_list.flatMap((element) => {
        return element.skill_stat ?? '-'; 
    });
    
    const uses_skill_name = skill_name[0].split(',');
    const uses_skill_stat = skill_stat[0].split(',');

    if(uses_skill_name[0] === '') uses_skill_name.shift();
    if(uses_skill_stat[0] === '') uses_skill_stat.shift();
    
    const result = {
        uses_skill_name: uses_skill_name,
        uses_skill_stat: uses_skill_stat,
    };
    console.log(result);

    return result;
};

export const make_user_skill_list = async (user_id: string) => {
    const skill_list = await get_skill_list(user_id);

    const skill_point = skill_list.flatMap((element) => { // 기능포인트
        return element.skill_point;
    });
    const accounting = skill_list.flatMap((element) => { // 회계
        return element.accounting
    });
    const anthropology = skill_list.flatMap((element) => { // 인류학
        return element.anthropology
    });
    const archaeology = skill_list.flatMap((element) => { // 고고학
        return element.archaeology
    });
    const art = skill_list.flatMap((element) => { // 예술
        return element.art
    });
    const astronomy = skill_list.flatMap((element) => { // 천문학
        return element.astronomy
    });
    const bargain = skill_list.flatMap((element) => { // 흥정
        return element.bargain
    });
    const biology = skill_list.flatMap((element) => { // 생물학
        return element.biology
    });
    const chemistry = skill_list.flatMap((element) => { // 화학
        return element.chemistry
    });
    const climb = skill_list.flatMap((element) => { // 등반
        return element.climb
    });
    const computer = skill_list.flatMap((element) => { // 컴퓨터
        return element.computer
    });
    const conceal = skill_list.flatMap((element) => { // 은닉
        return element.conceal
    });
    const craft = skill_list.flatMap((element) => { // 제작
        return element.craft
    });
    const credit_rating = skill_list.flatMap((element) => { // 신용
        return element.credit_rating
    });
    const cthulhu_mythos = skill_list.flatMap((element) => { // 크툴루 신화
        return element.cthulhu_mythos
    });
    const disguise = skill_list.flatMap((element) => { // 변장
        return element.disguise
    });
    const dodge = skill_list.flatMap((element) => { // 회피
        return element.dodge
    });
    const drive_automobile = skill_list.flatMap((element) => { // 운전
        return element.drive_automobile
    });
    const electrical_repair = skill_list.flatMap((element) => { // 전기수리
        return element.electrical_repair
    });
    const electronics = skill_list.flatMap((element) => { // 전자공학
        return element.electronics
    });
    const fast_talk = skill_list.flatMap((element) => { // 말주변
        return element.fast_talk
    });
    const first_aid = skill_list.flatMap((element) => { // 응급치료
        return element.first_aid
    });
    const geology = skill_list.flatMap((element) => { // 지질학
        return element.geology
    });
    const hide = skill_list.flatMap((element) => { // 숨기
        return element.hide
    });
    const history = skill_list.flatMap((element) => { // 역사
        return element.history
    });
    const jump = skill_list.flatMap((element) => { // 도약
        return element.jump
    });
    const law = skill_list.flatMap((element) => { // 법률
        return element.law
    });
    const library_use = skill_list.flatMap((element) => { // 자료 조사
        return element.library_use
    });
    const listener = skill_list.flatMap((element) => { // 듣기
        return element.listener
    });
    const locksmith = skill_list.flatMap((element) => { // 자물쇠 다루기
        return element.locksmith
    });
    const martial_arts = skill_list.flatMap((element) => { // 무술
        return element.martial_arts
    });
    const mechanical_repair = skill_list.flatMap((element) => { // 기계 수리
        return element.mechanical_repair
    });
    const medicine = skill_list.flatMap((element) => { // 의학
        return element.medicine
    });
    const natural_history = skill_list.flatMap((element) => { // 자연사
        return element.natural_history
    });
    const navigate = skill_list.flatMap((element) => { // 위치 파악
        return element.navigate
    });
    const occult = skill_list.flatMap((element) => { // 신비학
        return element.occult
    });
    const operate_heavy_machine = skill_list.flatMap((element) => { // 중장비 운전
        return element.operate_heavy_machine
    });
    const other_language = skill_list.flatMap((element) => { // 외국어
        return element.other_language
    });
    const own_language = skill_list.flatMap((element) => { // 모국어
        return element.own_language
    });
    const persuade = skill_list.flatMap((element) => { // 설득 222
        return element.persuade
    });
    const photography = skill_list.flatMap((element) => { // 사진술
        return element.photography
    });
    const physics = skill_list.flatMap((element) => { // 물리학
        return element.physics
    });
    const pilot = skill_list.flatMap((element) => { // 조종
        return element.pilot
    });
    const aircraft_control = skill_list.flatMap((element) => { // 항공기 조종
        return element.aircraft_control
    });
    const ship_control = skill_list.flatMap((element) => { // 선박 조종
        return element.ship_control
    });
    const psychoanalysis = skill_list.flatMap((element) => { // 정신 분석
        return element.psychoanalysis
    });
    const psychology = skill_list.flatMap((element) => { // 심리학
        return element.psychology
    });
    const ride = skill_list.flatMap((element) => { // 승마(탈것)
        return element.ride
    });
    const sneak = skill_list.flatMap((element) => { // 잠행
        return element.sneak
    });
    const swim = skill_list.flatMap((element) => { // 수영
        return element.swim
    });
    const throws = skill_list.flatMap((element) => { // 던지기
        return element.throw
    });
    const track = skill_list.flatMap((element) => { // 추적
        return element.track
    });
    const handgun = skill_list.flatMap((element) => { // 권총사격
        return element.handgun
    });
    const math = skill_list.flatMap((element) => { // 수학 222
        return element.math
    });
    const machine_gun = skill_list.flatMap((element) => { // 기관총사격
        return element.machine_gun
    });
    const rifle = skill_list.flatMap((element) => { // 소총사격
        return element.rifle
    });
    const shotgun = skill_list.flatMap((element) => { // 산탄총사격
        return element.shotgun
    });
    const submachine_gun = skill_list.flatMap((element) => { // 기관단총사격
        return element.submachine_gun
    });
    const fist_punch = skill_list.flatMap((element) => { // 주먹질
        return element.fist_punch
    });
    const grapple = skill_list.flatMap((element) => { // 붙잡기
        return element.grapple
    });
    const head_buff = skill_list.flatMap((element) => { // 박치기
        return element.head_buff
    });
    const kick = skill_list.flatMap((element) => { // 발차기
        return element.kick
    });
    const observation = skill_list.flatMap((element) => { // 관찰력
        return element.observation
    });
    const charm = skill_list.flatMap((element) => { // 매혹
        return element.charm
    });

    let result_skill: Number[] = [
        skill_point[0], 
        accounting[0], 
        anthropology[0], 
        archaeology[0], 
        art[0], 
        astronomy[0], 
        bargain[0], 
        biology[0],
        chemistry[0], 
        climb[0], 
        computer[0], 
        conceal[0], 
        craft[0], 
        credit_rating[0], 
        cthulhu_mythos[0], 
        disguise[0],
        dodge[0], 
        drive_automobile[0], 
        electrical_repair[0], 
        electronics[0], 
        fast_talk[0], 
        first_aid[0], 
        geology[0], 
        hide[0], 
        history[0], 
        jump[0], 
        law[0], 
        library_use[0], 
        listener[0], 
        locksmith[0], 
        martial_arts[0], 
        mechanical_repair[0], 
        medicine[0], 
        natural_history[0], 
        navigate[0], 
        occult[0], 
        operate_heavy_machine[0], 
        other_language[0], 
        own_language[0], 
        photography[0], 
        physics[0], 
        pilot[0], 
        aircraft_control[0], 
        ship_control[0], 
        psychoanalysis[0], 
        psychology[0], 
        ride[0], 
        sneak[0], 
        swim[0], 
        throws[0], 
        track[0], 
        handgun[0], 
        machine_gun[0], 
        rifle[0], 
        shotgun[0], 
        submachine_gun[0], 
        fist_punch[0], 
        grapple[0], 
        head_buff[0], 
        kick[0], 
        observation[0], 
        charm[0], 
        persuade[0], 
        math[0]
    ]
    return result_skill.toString().split(',');
};
