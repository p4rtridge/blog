import { GetStaticProps } from 'next';

import { Clock } from '../components/Clock';
import { IndexList, IndexRow, IndexSection, Lede, NoteRow } from '../components/Index';
import { PageShell } from '../components/PageShell';
import site from '../../blog.config.json';
import { Note, notesApi } from '../lib/notesApi';

const seoTitle = site.name;
const seoDescription = site.bio;

type Props = {
  latestNotes: Note[];
  noteCount: number;
};

export default function Home({ latestNotes, noteCount }: Props) {
  return (
    <PageShell seoTitle={seoTitle} seoDescription={seoDescription}>
      <Lede>
        <p className="text-body">{site.bio}</p>
      </Lede>
      {site.clock.enabled && <Clock />}

      <IndexSection
        label={site.home.notesLabel}
        more={{ href: '/notes', label: `all ${noteCount} →` }}
      >
        <IndexList>
          {latestNotes.map((note) => (
            <NoteRow key={note.slug} note={note} />
          ))}
        </IndexList>
      </IndexSection>

      <IndexSection label={site.home.linksLabel}>
        <IndexList>
          {site.links.map((link) => (
            <IndexRow
              key={link.key}
              href={link.href}
              external={link.href.startsWith('http')}
              lead={link.key}
              main={link.value}
              trail={<span aria-hidden="true">↗</span>}
            />
          ))}
        </IndexList>
      </IndexSection>
    </PageShell>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await notesApi.getNotes('desc');

  return {
    props: { latestNotes: notes.slice(0, site.home.latestNotesLimit), noteCount: notes.length },
    revalidate: 3600,
  };
};
