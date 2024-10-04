"use client"
import React from 'react'
import One from "@/assets/team/1.jpg"
import Two from "@/assets/team/2.jpg"
import Three from "@/assets/team/3.jpg"
import Four from "@/assets/team/4.jpg"
import Five from "@/assets/team/5.jpg"
import Six from "@/assets/team/6.jpg"
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'

const teamData = [
    { name: "Nazmus Sakib", src: One, tagline: "Team Lead & Machine Learning Expert" },
    { name: "Sartiz Alam Ayon", src: Two, tagline: "Backend & Machine Learning Expert"},
    { name: "Minhazur Rahaman Ratul", src: Three, tagline: "Product Designer" },
    { name: "Mehedi Hasan Fuad", src: Four, tagline: "Researcher & Team Organizer" },
    { name: "Rukiaya Mim", src: Five, tagline: "Researcher & Video Editor" },
    { name: "SM Fardin", src: Six, tagline: "Researcher & Video Editor" }
]

export default function Team() {
  return (
    <section id='team' className='py-12 border-t'>
    <div className="container mx-auto max-w-5xl space-y-2 mb-6">
        <h2 className='text-3xl font-semibold'>The Team</h2>
        <p className='font-medium text-muted-foreground'>Who are we?</p>
    </div>
    <div className='grid grid-cols-3 gap-6 container max-w-5xl mx-auto'>
        {teamData.map((teamMem, index) => (
            <Card key={index}>
                <CardHeader>
                    <Image className='rounded-md border' src={teamMem.src} alt={teamMem.name} />
                </CardHeader>
                <CardContent>
                        <h3 className='text-lg font-semibold'>{teamMem.name}</h3>
                        <p className='text-muted-foreground'>{teamMem.tagline}</p>
                </CardContent>
            </Card>
        ))}
    </div>
    </section>
  )
}
