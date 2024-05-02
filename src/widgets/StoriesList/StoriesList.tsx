import { CardGrid } from '@vkontakte/vkui'
import { FC } from 'react'

import { StoryCard } from '../../entities/Story/StoryCard'

import type { StoriesListProps } from './types'

export const StoriesList: FC<StoriesListProps> = ({ storiesArray }) => {
	return (
		<CardGrid size="l">
			{storiesArray.map((storyId) => (
				<StoryCard storyId={storyId} key={`story id: ${storyId}`} />
			))}
		</CardGrid>
	)
}
