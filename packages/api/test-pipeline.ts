import { editorialPipeline } from './pipeline';

async function test() {
    const interests = ["아이돌", "뉴진스", "게임", "마인크래프트"];
    const news = [
        "뉴진스 민지, 신곡 무대에서 압도적인 가창력 뽐내",
        "마인크래프트, 교육용 에디션에 새로운 역사 탐험 월드 추가",
        "청소년 문해력 저하 우려... 신문 읽기 캠페인 확산"
    ];
    const difficulty = "LEVEL_2";

    console.log('--- AI Editorial Pipeline Test Start ---');
    try {
        const result = await editorialPipeline.generateEditorial(interests, news, difficulty);
        console.log('\nFinal Result:');
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Test Failed:', error);
    }
}

test();
