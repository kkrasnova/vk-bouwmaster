import { NextRequest, NextResponse } from 'next/server';
import { translateTeamMember } from '@/lib/translate';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const TEAM_FILE = join(process.cwd(), 'src/lib/team-data.json');

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: string;
  translations?: Record<string, {
    name: string;
    position: string;
    bio: string;
    specialties: string[];
    experience: string;
  }>;
}

function readTeamData(): TeamMember[] {
  try {
    const data = readFileSync(TEAM_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeTeamData(data: TeamMember[]) {
  writeFileSync(TEAM_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    const force = searchParams.get('force') === 'true';
    
    const members = readTeamData();
    
    if (memberId) {
      const index = members.findIndex(m => m.id === memberId);
      if (index === -1) {
        return NextResponse.json(
          { error: 'Член команды не найден' },
          { status: 404 }
        );
      }
      
      const member = members[index];
      console.log(`[Translate Team API] 🔄 Translating member ${memberId}: "${member.name}"`);
      
      try {
        const translations = await translateTeamMember({
          name: member.name,
          position: member.position,
          bio: member.bio || '',
          specialties: member.specialties || [],
          experience: member.experience || ''
        });
        
        members[index] = { ...member, translations };
        writeTeamData(members);
        
        console.log(`[Translate Team API] ✅ Successfully translated member ${memberId}`);
        return NextResponse.json({ 
          success: true, 
          message: `Переводы для члена команды ${memberId} обновлены`,
          member: members[index]
        });
      } catch (error: any) {
        console.error(`[Translate Team API] ❌ Error translating member ${memberId}:`, error);
        return NextResponse.json(
          { error: `Ошибка перевода: ${error.message || 'Неизвестная ошибка'}` },
          { status: 500 }
        );
      }
    } else {
      let translatedCount = 0;
      let errorCount = 0;
      
      console.log(`[Translate Team API] 🔄 Starting translation of ${members.length} members (force=${force})...`);
      
      for (let i = 0; i < members.length; i++) {
        const member = members[i];
        
        if (!force && member.translations && Object.keys(member.translations).length >= 5) {
          const hasAllFields = Object.values(member.translations).every(
            t => t && t.position && t.bio && t.specialties
          );
          if (hasAllFields) {
            console.log(`[Translate Team API] ⏭️ Skipping member ${member.id} (already translated)`);
            continue;
          }
        }
        
        try {
          console.log(`[Translate Team API] 🔄 Translating member ${i + 1}/${members.length}: "${member.name}"`);
          const translations = await translateTeamMember({
            name: member.name,
            position: member.position,
            bio: member.bio || '',
            specialties: member.specialties || [],
            experience: member.experience || ''
          });
          
          members[i] = { ...member, translations };
          translatedCount++;
          
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error: any) {
          console.error(`[Translate Team API] ❌ Error translating member ${member.id}:`, error.message || error);
          errorCount++;
        }
      }
      
      if (translatedCount > 0) {
        writeTeamData(members);
        console.log(`[Translate Team API] ✅ Saved ${translatedCount} translated members`);
      }
      
      return NextResponse.json({
        success: true,
        message: `Переведено членов команды: ${translatedCount}, ошибок: ${errorCount}`,
        translated: translatedCount,
        errors: errorCount,
        total: members.length
      });
    }
  } catch (error: any) {
    console.error('[Translate Team API] ❌ Fatal error:', error);
    return NextResponse.json(
      { error: `Критическая ошибка: ${error.message || 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}

