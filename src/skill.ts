import { 
    get_skill_list, 
    get_skill_point,
    get_ability_idea, 
    get_uses_skill_list, 
} from "./sql/select";
import { 
    update_skill_point, 
    update_use_skill_point, 
    update_reset_uses_skill,
} from "./sql/update";
import { upsert_uses_skill } from "./sql/upsert";
import { Message, MessageEmbed } from "discord.js";

export let skill_add = {
    start: false,
};

let default_skill_list = 
    [
        ['고고학', '1'], ['관찰력', '25'], ['권총사격', '20'], 
        ['기계수리', '20'], ['기관단총', '15'], ['기관총사격', '15'],
        ['던지기', '25'], ['도약', '25'], ['듣기', '25'], 
        ['등반', '40'], ['말주변', '5'], ['매혹', '15'], 
        ['모국어', '0'], ['무술', '1'], ['물리학', '1'], 
        ['박치기', '10'], ['발차기', '25'], ['법률', '5'],
        ['변장', '1'], ['붙잡기', '25'], ['사진술', '10'],
        ['산탄총사격', '30'], ['설득', '15'], ['선박조종', '0'], 
        ['생물학', '1'], ['소총사격', '25'], ['수영', '25'], 
        ['수학', '10'], ['숨기', '10'], ['승마', '5'],  
        ['신용', '15'], ['신비학', '5'], ['심리학', '5'],
        ['역사', '20'], ['예술', '5'], ['운전', '20'], 
        ['은닉', '15'],['응급치료', '30'], ['외국어', '1'], 
        ['의학', '5'], ['인류학', '1'], ['위치파악', '10'], 
        ['자료조사', '25'], ['자연사', '10'], ['자물쇠다루기', '1'], 
        ['잠행', '25'], ['정신분석', '1'], ['전기수리', '10'], 
        ['전자공학', '1'], ['제작', '5'], ['조종', '1'], 
        ['주먹질', '50'], ['중장비운전', '1'], ['지질학', '1'], 
        ['천문학', '1'], ['추적', '10'],  ['컴퓨터', '1'],
        ['크툴루신화', '0'], ['항공기조종', '0'], ['화학', '1'],
        ['회피', '0'],  ['회계', '10'], ['흥정', '5'],
    ];

export const get_user_all_skill_list = async (message: Message<boolean>, user_id: string) => {
    if(!(message.content === '!기능목록')) return;
    const user_skill = await get_uses_skill_list(user_id);
    const temp_skill_name = user_skill.flatMap((element) => {
        return element.skill_name ?? '';
    });
    const temp_skill_stat = user_skill.flatMap((element) => {
        return element.skill_stat ?? '';
    });

    const skill_list_arr = await make_user_skill_list(user_id);
    const skill_point = skill_list_arr[0];
    if((temp_skill_name[0] === '')) temp_skill_name[0] = ' ';
    const skill_name = temp_skill_name[0]?.split(',') ?? '';
    const skill_stat = temp_skill_stat[0]?.split(',') ?? '';

    for(let i = 0; i < skill_name.length; i++){
        for(let j = 0; j < default_skill_list.length; j++){
            if(skill_name[i] === default_skill_list[j][0]){
                default_skill_list[j][0] = '✨' + skill_name[i];
                default_skill_list[j][1] = skill_stat[i];
                break;
            }
        }
    }

    const send_embed =
        [
            default_skill_list[0][0] + '( ' + default_skill_list[0][1] + '% )\t' + default_skill_list[1][0] + '( ' + default_skill_list[1][1] + '% )\t' + default_skill_list[2][0] + '( ' + default_skill_list[2][1] + '% )',
            default_skill_list[3][0] + '( ' + default_skill_list[3][1] + '% )\t' + default_skill_list[4][0] + '( ' + default_skill_list[4][1] + '% )\t' + default_skill_list[5][0] + '( ' + default_skill_list[5][1] + '% )',
            default_skill_list[6][0] + '( ' + default_skill_list[6][1] + '% )\t' + default_skill_list[7][0] + '( ' + default_skill_list[7][1] + '% )\t' + default_skill_list[8][0] + '( ' + default_skill_list[8][1] + '% )',
            default_skill_list[9][0] + '( ' + default_skill_list[9][1] + '% )\t' + default_skill_list[10][0] + '( ' + default_skill_list[10][1] + '% )\t' + default_skill_list[11][0] + '( ' + default_skill_list[11][1] + '% )',
            default_skill_list[12][0] + '( ' + default_skill_list[12][1] + '% )\t' + default_skill_list[13][0] + '( ' + default_skill_list[13][1] + '% )\t' + default_skill_list[14][0] + '( ' + default_skill_list[14][1] + '% )',
            default_skill_list[15][0] + '( ' + default_skill_list[15][1] + '% )\t' + default_skill_list[16][0] + '( ' + default_skill_list[16][1] + '% )\t' + default_skill_list[17][0] + '( ' + default_skill_list[17][1] + '% )',
            default_skill_list[18][0] + '( ' + default_skill_list[18][1] + '% )\t' + default_skill_list[19][0] + '( ' + default_skill_list[19][1] + '% )\t' + default_skill_list[20][0] + '( ' + default_skill_list[20][1] + '% )',
            default_skill_list[21][0] + '( ' + default_skill_list[21][1] + '% )\t' + default_skill_list[22][0] + '( ' + default_skill_list[22][1] + '% )\t' + default_skill_list[23][0] + '( ' + default_skill_list[23][1] + '% )',
            default_skill_list[24][0] + '( ' + default_skill_list[24][1] + '% )\t' + default_skill_list[25][0] + '( ' + default_skill_list[25][1] + '% )\t' + default_skill_list[26][0] + '( ' + default_skill_list[26][1] + '% )',
            default_skill_list[27][0] + '( ' + default_skill_list[27][1] + '% )\t' + default_skill_list[28][0] + '( ' + default_skill_list[28][1] + '% )\t' + default_skill_list[29][0] + '( ' + default_skill_list[29][1] + '% )',
            default_skill_list[30][0] + '( ' + default_skill_list[30][1] + '% )\t' + default_skill_list[31][0] + '( ' + default_skill_list[31][1] + '% )\t' + default_skill_list[32][0] + '( ' + default_skill_list[32][1] + '% )',
            default_skill_list[33][0] + '( ' + default_skill_list[33][1] + '% )\t' + default_skill_list[34][0] + '( ' + default_skill_list[34][1] + '% )\t' + default_skill_list[35][0] + '( ' + default_skill_list[35][1] + '% )',
            default_skill_list[36][0] + '( ' + default_skill_list[36][1] + '% )\t' + default_skill_list[37][0] + '( ' + default_skill_list[37][1] + '% )\t' + default_skill_list[38][0] + '( ' + default_skill_list[38][1] + '% )',
            default_skill_list[39][0] + '( ' + default_skill_list[39][1] + '% )\t' + default_skill_list[40][0] + '( ' + default_skill_list[40][1] + '% )\t' + default_skill_list[41][0] + '( ' + default_skill_list[41][1] + '% )',
            default_skill_list[42][0] + '( ' + default_skill_list[42][1] + '% )\t' + default_skill_list[43][0] + '( ' + default_skill_list[43][1] + '% )\t' + default_skill_list[44][0] + '( ' + default_skill_list[44][1] + '% )',
            default_skill_list[45][0] + '( ' + default_skill_list[45][1] + '% )\t' + default_skill_list[46][0] + '( ' + default_skill_list[46][1] + '% )\t' + default_skill_list[47][0] + '( ' + default_skill_list[47][1] + '% )',
            default_skill_list[48][0] + '( ' + default_skill_list[48][1] + '% )\t' + default_skill_list[49][0] + '( ' + default_skill_list[49][1] + '% )\t' + default_skill_list[50][0] + '( ' + default_skill_list[50][1] + '% )',
            default_skill_list[51][0] + '( ' + default_skill_list[51][1] + '% )\t' + default_skill_list[52][0] + '( ' + default_skill_list[52][1] + '% )\t' + default_skill_list[53][0] + '( ' + default_skill_list[53][1] + '% )',
            default_skill_list[54][0] + '( ' + default_skill_list[54][1] + '% )\t' + default_skill_list[55][0] + '( ' + default_skill_list[55][1] + '% )\t' + default_skill_list[56][0] + '( ' + default_skill_list[56][1] + '% )',
            default_skill_list[57][0] + '( ' + default_skill_list[57][1] + '% )\t' + default_skill_list[58][0] + '( ' + default_skill_list[58][1] + '% )\t' + default_skill_list[59][0] + '( ' + default_skill_list[59][1] + '% )',
            default_skill_list[60][0] + '( ' + default_skill_list[60][1] + '% )\t' + default_skill_list[61][0] + '( ' + default_skill_list[61][1] + '% )\t' + default_skill_list[62][0] + '( ' + default_skill_list[62][1] + '% )',
        ];

    const embed = new MessageEmbed()
    .setColor('#C171F5')
    .addFields(
        { name: '✨기능 목록' , value: 'ㅤ'},
        { name: '잔여 스킬포인트 : ' + skill_point, value: 'ㅤ' },
        { name: send_embed[0] , value: 'ㅤ'},
        { name: send_embed[1] , value: 'ㅤ'},
        { name: send_embed[2] , value: 'ㅤ'},
        { name: send_embed[3] , value: 'ㅤ'},
        { name: send_embed[4] , value: 'ㅤ'},
        { name: send_embed[5] , value: 'ㅤ'},
        { name: send_embed[6] , value: 'ㅤ'},
        { name: send_embed[7] , value: 'ㅤ'},
        { name: send_embed[8] , value: 'ㅤ'},
        { name: send_embed[9] , value: 'ㅤ'},
        { name: send_embed[10] , value: 'ㅤ'},
        { name: send_embed[11] , value: 'ㅤ'},
        { name: send_embed[12] , value: 'ㅤ'},
        { name: send_embed[13] , value: 'ㅤ'},
        { name: send_embed[14] , value: 'ㅤ'},
        { name: send_embed[15] , value: 'ㅤ'},
        { name: send_embed[16] , value: 'ㅤ'},
        { name: send_embed[17] , value: 'ㅤ'},
        { name: send_embed[18] , value: 'ㅤ'},
        { name: send_embed[19] , value: 'ㅤ'},
        { name: send_embed[20] , value: 'ㅤ'},
    )
    await message.channel.sendTyping();
    await message.channel.send({embeds: [embed]});
    
    default_skill_list = 
    [
        ['고고학', '1'], ['관찰력', '25'], ['권총사격', '20'], 
        ['기계수리', '20'], ['기관단총', '15'], ['기관총사격', '15'],
        ['던지기', '25'], ['도약', '25'], ['듣기', '25'], 
        ['등반', '40'], ['말주변', '5'], ['매혹', '15'], 
        ['모국어', '0'], ['무술', '1'], ['물리학', '1'], 
        ['박치기', '10'], ['발차기', '25'], ['법률', '5'],
        ['변장', '1'], ['붙잡기', '25'], ['사진술', '10'],
        ['산탄총사격', '30'], ['설득', '15'], ['선박조종', '0'], 
        ['생물학', '1'], ['소총사격', '25'], ['수영', '25'], 
        ['수학', '10'], ['숨기', '10'], ['승마', '5'],  
        ['신용', '15'], ['신비학', '5'], ['심리학', '5'],
        ['역사', '20'], ['예술', '5'], ['운전', '20'], 
        ['은닉', '15'],['응급치료', '30'], ['외국어', '1'], 
        ['의학', '5'], ['인류학', '1'], ['위치파악', '10'], 
        ['자료조사', '25'], ['자연사', '10'], ['자물쇠다루기', '1'], 
        ['잠행', '25'], ['정신분석', '1'], ['전기수리', '10'], 
        ['전자공학', '1'], ['제작', '5'], ['조종', '1'], 
        ['주먹질', '50'], ['중장비운전', '1'], ['지질학', '1'], 
        ['천문학', '1'], ['추적', '10'],  ['컴퓨터', '1'],
        ['크툴루신화', '0'], ['항공기조종', '0'], ['화학', '1'],
        ['회피', '0'],  ['회계', '10'], ['흥정', '5'],
    ];

    return;
};

export const add_user_skill_list = async (message: Message<boolean> , user_id: string) => {
    if(!(message.content.startsWith('!기능추가'))) return;

    const add_skill_command = message.content.split(' ');
    let skill_name = add_skill_command[1]; // 관찰력
    let skill_stat = Number(add_skill_command[2]); // 45 기존 기능 값에 + 해서 입력해야함
    let default_stat = 0;
    const temp_stat = skill_stat;

    const skill_point = await get_skill_point(user_id);
    if(skill_point < skill_stat){
        message.channel.send('잔여 기능포인트가 부족합니다. ``!기능목록`` 확인 후 진행해주시기 바랍니다.');
        return;
    }

    switch(true){
        case ['등반'].includes(skill_name):
            default_stat = 40;
            break;
        case ['주먹질'].includes(skill_name):
            default_stat = 50;
            break;
        case ['응급치료', '산탄총사격'].includes(skill_name):
            default_stat = 30;
            break;
        case ['기계수리', '운전', '역사', '권총사격'].includes(skill_name):
            default_stat = 20;
            break;
        case ['신용', '기관총사격', '기관단총', '매혹', '은닉', '설득'].includes(skill_name):
            default_stat = 15;
            break;
        case ['예술', '승마', '의학', '신비학', '흥정', '제작', '심리학'].includes(skill_name):
            default_stat = 5;
            break;
        case ['회계', '위치파악', '박치기', '숨기', '추적', '전기수리', '자연사', '사진술', '수학'].includes(skill_name):
            default_stat = 10;
            break;
        case ['도약', '듣기', '던지기', '잠행', '소총사격', '발차기', '자료조사', '수영', '붙잡기', '관찰력'].includes(skill_name):
            default_stat = 25;
            break;
        case ['생물학', '컴퓨터', '전자공학', '지질학', '외국어', '물리학', '인류학', '천문학', '화학', '자물쇠다루기', '조종', '정신분석', '고고학', '변장', '무술'].includes(skill_name):
            default_stat = 1;
            break;
    }
    const skill_data = await make_uses_skill_data(user_id, skill_name, skill_stat, default_stat, temp_stat);

    await update_use_skill_point(user_id, temp_stat); // 잔여기능포인트 업데이트
    await upsert_uses_skill(user_id, skill_data.skill_name, skill_data.skill_stat, skill_data.use_point);
    await message.channel.send(skill_name + '기능이 추가 되었습니다. !기능목록으로 확인 부탁드립니다.');

    return;
};

const make_uses_skill_data = async (user_id: string, skill_name: string, skill_stat: number, default_stat: number, temp_point: number) => {
    let use_point = 0;
    let temp_skill_stat = '';

    const check_skill = await get_uses_skill_list(user_id);
    const ckeck_skill_name = check_skill.flatMap((element) => {
        return element.skill_name;
    });
    console.log('check_skill_name : ' + ckeck_skill_name);
    if(!(ckeck_skill_name[0] ===  undefined || ckeck_skill_name[0] === '')){ // 이미 기능추가를 한적있는지
        const skill_uses_list = get_uses_skill_list(user_id);

        const use_stack_point = (await skill_uses_list).flatMap((element) => { // 지금까지 사용한 포인트
            return element.use_point;
        });
        const use_stack_skill_name = (await skill_uses_list).flatMap((element) => { // 지금까지 넣은 스킬
            return element.skill_name;
        });
        const use_stack_skill_stat = (await skill_uses_list).flatMap((element) => { // 지금까지 넣은 스킬의 각각의 포인트
            return element.skill_stat;
        });

        let use_stack_skill_name_arr = use_stack_skill_name[0]?.split(',');
        let use_stack_skill_stat_arr = use_stack_skill_stat[0]!.split(',');
        
        const check_num = use_stack_skill_name_arr!.indexOf(skill_name);
        use_point = temp_point + use_stack_point[0];

        if(check_num === undefined || check_num === -1){
            temp_skill_stat = use_stack_skill_stat + ',' + String(skill_stat + default_stat);
            skill_name = use_stack_skill_name + ',' + skill_name;
        }else{
            let temp_skill_stat_num = Number(use_stack_skill_stat_arr[check_num]);

            use_stack_skill_stat_arr![check_num] = String(skill_stat + temp_skill_stat_num);
            const use_sktack_skill_stat_string = use_stack_skill_stat_arr!.join(',');

            skill_name = use_stack_skill_name_arr!.join(',');
            temp_skill_stat = use_sktack_skill_stat_string;
            console.log(use_sktack_skill_stat_string);
        }
    }else{
        use_point = temp_point;
        temp_skill_stat = String(skill_stat + default_stat);
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

export const end_user_skill = async (message: Message<boolean>) => {
    if(!(message.content === '!기능 입력 완료')) return; 
    
    skill_add.start = true;
    await message.channel.send('기능 입력이 완료되었습니다. ``!가이드`` 명령어 입력 후 계속 진행해주세요');

    return;
};

export const view_uses_skill_list = async (user_id: string) => {
    const uses_skill_list = await get_uses_skill_list(user_id);

    const skill_name = uses_skill_list.flatMap((element) => {
        return element?.skill_name ?? '빈기능';
    });
    const skill_stat = uses_skill_list.flatMap((element) => {
        return element?.skill_stat ?? '-'; 
    });

    const uses_skill_name = skill_name[0]?.split(',') ?? '-';
    const uses_skill_stat = skill_stat[0]?.split(',') ?? '-';

    if(uses_skill_name[0] === '') uses_skill_name.shift();
    if(uses_skill_stat[0] === '') uses_skill_stat.shift();
    
    const result = {
        uses_skill_name: uses_skill_name,
        uses_skill_stat: uses_skill_stat,
    };

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
    ];
    
    return result_skill.toString().split(',');
};
