import { Button, Badge } from '../'
import { styles } from './ThemeDemo.styles'

import type { ThemeDemoProps } from './ThemeDemo.props'

export const ThemeDemo = ({ isDark, onToggleTheme }: ThemeDemoProps) => (
    <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.title}>
                        🎨 Aurora Theme Playground
                    </h1>
                    <p className={styles.subtitle}>
                        Testez les composants et le système de thème en temps réel
                    </p>
                </div>
                <Button
                    variant={'outline'}
                    onClick={onToggleTheme}
                >
                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </Button>
            </div>
        </header>

        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Boutons
            </h2>
            <div className={styles.row}>
                <Button variant={'primary'}>
                    Primary
                </Button>
                <Button variant={'secondary'}>
                    Secondary
                </Button>
                <Button variant={'success'}>
                    Success
                </Button>
                <Button variant={'warning'}>
                    Warning
                </Button>
                <Button variant={'error'}>
                    Error
                </Button>
                <Button variant={'outline'}>
                    Outline
                </Button>
                <Button variant={'ghost'}>
                    Ghost
                </Button>
            </div>
        </div>

        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Tailles de boutons
            </h2>
            <div className={styles.row}>
                <Button size={'sm'}>
                    Small
                </Button>
                <Button size={'md'}>
                    Medium
                </Button>
                <Button size={'lg'}>
                    Large
                </Button>
            </div>
        </div>

        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Badges
            </h2>
            <div className={styles.row}>
                <Badge variant={'primary'}>
                    Primary
                </Badge>
                <Badge variant={'secondary'}>
                    Secondary
                </Badge>
                <Badge variant={'success'}>
                    Success
                </Badge>
                <Badge variant={'warning'}>
                    Warning
                </Badge>
                <Badge variant={'error'}>
                    Error
                </Badge>
                <Badge variant={'neutral'}>
                    Neutral
                </Badge>
            </div>
        </div>

        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Badges Pill
            </h2>
            <div className={styles.row}>
                <Badge
                    variant={'primary'}
                    pill
                >
                    Primary
                </Badge>
                <Badge
                    variant={'success'}
                    pill
                >
                    New
                </Badge>
                <Badge
                    variant={'error'}
                    pill
                >
                    Alert
                </Badge>
            </div>
        </div>

        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
                Indicateurs (Dots)
            </h2>
            <div className={styles.row}>
                <Badge
                    variant={'primary'}
                    dot
                />
                <Badge
                    variant={'success'}
                    dot
                />
                <Badge
                    variant={'warning'}
                    dot
                />
                <Badge
                    variant={'error'}
                    dot
                />
            </div>
        </div>
    </div>
)
