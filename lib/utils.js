function getRandomWord(list) {
    return list[Math.floor(Math.random() * list.length)]
}

async function checkNameExists(prisma, name) {
    const result = await prisma.library.findUnique({
      where: { name }
    });
    return !!result;
  }

export { getRandomWord,checkNameExists }