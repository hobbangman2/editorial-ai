import { DictationWorkspace } from '@editorial-ai/ui';
import { View } from 'react-native';

export default function App() {
  const mockEditorial = {
    title: "뉴진스와 함께하는 현대 문해력 기행",
    content: "음악은 국경을 넘는 언어입니다. 최근 뉴진스와 같은 아티스트들은 단순한 즐거움을 넘어 사회적 메시지를 전달하기도 합니다. 우리가 좋아하는 주제를 통해 글을 읽고 쓰는 것은 문해력을 높이는 가장 즐거운 방법입니다."
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <DictationWorkspace
        title={mockEditorial.title}
        content={mockEditorial.content}
      />
    </View>
  );
}
