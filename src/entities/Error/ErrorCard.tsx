import {
	Icon20RefreshOutline,
	Icon28ErrorCircleOutline
} from '@vkontakte/icons'
import { Button, Card, ContentCard, Headline } from '@vkontakte/vkui'
import { FC } from 'react'

import styles from './ErrorCard.module.scss'

import type { ErrorCardProps } from './types'

export const ErrorCard: FC<ErrorCardProps> = ({ refresh }) => {
	return (
		<Card mode="outline-tint">
			<ContentCard
				header={
					<div className={styles.errorTitle}>
						<Icon28ErrorCircleOutline />
						<Headline level="1">Ошибка</Headline>
					</div>
				}
				text={
					refresh ? (
						<Button
							className={styles.reloadButtonStyles}
							mode="primary"
							appearance="accent"
							size="l"
							loading={refresh.loading}
							after={<Icon20RefreshOutline />}
							onClick={() => refresh.refreshFunction()}
						>
							Перезагрузить
						</Button>
					) : null
				}
				caption="Похоже произошла непредвиденная ошибка, попробуйте перезагрузить страницу..."
				height={120}
				mode="tint"
			/>
		</Card>
	)
}
