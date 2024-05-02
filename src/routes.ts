import {
	RoutesConfig,
	createHashRouter,
	createPanel,
	createRoot,
	createView
} from '@vkontakte/vk-mini-apps-router'

export const DEFAULT_ROOT = 'default_root'
export const DEFAULT_VIEW = 'default_view'

export const DEFAULT_VIEW_PANELS = {
	HOME: 'home',
	STORY_PANEL: 'story-panel'
} as const

export const routes = RoutesConfig.create([
	createRoot(DEFAULT_ROOT, [
		createView(DEFAULT_VIEW, [
			createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
			createPanel(
				DEFAULT_VIEW_PANELS.STORY_PANEL,
				`/${DEFAULT_VIEW_PANELS.STORY_PANEL}/:storyId`,
				[]
			)
		])
	])
])

export const router = createHashRouter(routes.getRoutes())
