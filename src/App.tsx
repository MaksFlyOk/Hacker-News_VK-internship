import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { SplitCol, SplitLayout, View } from '@vkontakte/vkui'

import { Modal } from './entities/Modal/Modal.tsx'

import { Home, StoryPanel } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'

export const App = () => {
	const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
		useActiveVkuiLocation()

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			<SplitLayout modal={Modal()}>
				<SplitCol>
					<View activePanel={activePanel}>
						<Home id="home" />
						<StoryPanel id="story-panel" />
					</View>
				</SplitCol>
			</SplitLayout>
		</QueryClientProvider>
	)
}
